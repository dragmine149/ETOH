class UserManager {
  /** @type {{id: number, name: string}} Roblox user information */
  user;

  /** @type {{
  *   rings: Object.<string, Object.<string, Date>>,
  *   zones: Object.<string, Object.<string, Date>>
  * }} */
  tower_data;

  /**
   * Process tower data and fill badge IDs array
   * @param {Object.<string, Object.<string, TowerData>>} towerData Tower data to process
   */
  getBadgeIds(towerData) {
    let badgeIds = [];
    for (const area of Object.values(towerData)) {
      for (const tower of Object.values(area)) {
        badgeIds.push(tower.badge_id);
        if (tower.old_id) badgeIds.push(tower.old_id);
      }
    }
    return badgeIds;
  }

  /**
  * Get the user id/name from any of the following formats:
  * - https://www.roblox.com/users/605215929/profile
  * - dragmine149
  * - 605215929
  * @param {(string | number)} user The user name/id to get the id/name of.
  * @returns A dictionary of the user id + name
  */
  async __getUserData(user) {
    async function get(info, name = false) {
      // Test for id
      let response = await fetch(`https://etoh-proxy.dragmine149.workers.dev/users/${info}${name ? "/name" : ""}`);

      if (!response.ok) {
        showNotification(`Failed to fetch user ${name ? "name" : "id"} for ${info}. (status: ${response.status} ${response.statusText})`, true);
        return null;
      }

      let data = await response.json();
      return name ? data.name : data.id;
    }

    let data = {};

    // attempt to see if input is JUST id.
    if (/^[0-9]*$/.test(user)) {
      data.id = parseInt(user);
    }

    // attempt to see if input is URL
    if (user.includes('roblox.com/users')) {
      let id = user.split('/users/')[1].split('/')[0];
      data.id = parseInt(id);
    }

    // Set the name to the user if we have no id
    if (!data.id) {
      data.name = user;
    }

    // query the database to see if we already have the user
    this.verbose.log(data);
    let dbuser = await towersDB.users.get(data);
    if (dbuser != undefined) {
      // return if we do
      return dbuser;
    }

    // query the server if we do not
    if (!data.id) {
      data.id = await get(data.name, false);
      towersDB.users.put(data);
      return data;
    }

    data.name = await get(data.id, true);
    towersDB.users.put(data);
    return data;
  }

  async loadUserData() {
    // Assumption: If we have data in towersDB.users, then we have previously loaded the user.
    let user = await towersDB.users.get(this.user);
    if (user == undefined || user.played == undefined) {
      this.verbose.log("Loading data from server");

      let request = new Request(`${CLOUD_URL}/towers/${this.user.id}/all`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "badgeids": towerManager.tower_ids
        })
      });

      await network.requestStream(request, async (line) => {
        // then insert the data (upon conversion) into the database.
        let badge = await noSyncTryCatch(() => JSON.parse(line));
        if (badge.error) {
          // showNotification(`Failed to parse badge data: ${badge.error}. Please try again later. (roblox api might be down)`);
        }

        /** @type {{badgeId: number, date: number}} */
        let badgeData = badge.data;
        // console.log(badgeData);

        towersDB.towers.put({
          badge_id: badgeData.badgeId,
          user_id: this.user.id,
          completion: badgeData.date
        });

        console.log(badgeData);
      })

    }
    console.log('User already been fetched, loading from storage');
  }

  /**
  * Create a new user class.
  * @param {string} user
  */
  constructor(user) {
    console.log(`Attempting to load: ${user}`);

    this.verbose = new Verbose(`UserManager`, '#6189af');

    (async () => {
      this.user = await this.__getUserData(user);
      await this.loadUserData();
    })();
  }

  storeUser() {
    return {
      id: this.user,
      towers: this.tower_data
    }
  }
}

class UserData {
  /** @type {UserManager[]} */
  users;

  /** @type {UserManager} */
  currentUser;

  constructor() {
    this.users = [];
    this.currentUser = null;
  }

  /**
  * Search a user and loads their information
  */
  searchUser() {
    let searchElm = document.getElementById("search_input").value;
    this.currentUser = new UserManager(searchElm);
    this.users.push(this.currentUser);
  }
}

let userData = new UserData();
let towersDB = new Dexie("Towers");
towersDB.version(1).stores({
  towers: `[badge_id+user_id]`,
  users: `[id+name], played`
})
