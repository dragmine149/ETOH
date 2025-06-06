/*global test, Test, other_file_test*/
/**
* @typedef { import('./test') }
*/

function outside_function(r) {
  let rebirth = {};
  rebirth.multiplier = r < 255 ? Math.pow(r + 1.5 - Math.sqrt(Math.pow(r, 1.5)), 0.575) : Math.pow(256.5 - Math.sqrt(Math.pow(255, 1.5)), 0.575) + ((r - 255) * 0.05);
  rebirth.cash = Math.round(20 * r * rebirth.multiplier);

  return rebirth;
}

test.describe("Test System Validation", () => {
  test.before({
    test: new Test()
  });

  test.test("Describe test",
    /** @param {Expect} expect  */
    (expect) => expect
      .from(
        /** @param {{test: Test}} globals  */
        (globals) => globals.test.describe("Test in a test", () => { }, true)
      )
      .exists_type('globals.test', Test)
      .exists_type('globals.test.test_data', Array)
  );

  test.test("Before test working",
    /** @param {Expect} expect  */
    (expect) => expect
      .from(
        /** @param {{test: Test}} globals  */
        (globals) => {
          globals.test.describe("Test in a test", () => {
            globals.test.before({
              test_func: (function (a, b) {
                return a * b;
              })
            })
          }, true)

        })
      .exists_type('globals.test.test_data', Array)
      .exists_type('globals.test.test_data.[0]', "object")
  );

  test.test("Testing the test",
    /** @param {Expect} expect  */
    (expect) => expect.from(
      /** @param {{test: Test}} globals  */
      (globals) => {
        //--------------------------------------------
        globals.test.describe("Test in a test", () => {
          globals.test.before({
            test_func: (function (a, b) {
              return a * b;
            })
          })
        }, true)
        globals.test.test("5 * 3 = 15",
          /** @param {Expect} expect */
          (expect) => expect.from(
            /** @param {{test_func: (a: number, b: number) => number}} inner_globals  */
            (inner_globals) => inner_globals.test_func(5, 3)
          )
            .exists_type('result', "number")
            .is('result', 15)
        )
        globals.test.test("outside function. Rebirth of 42", /** @param {Expect} expect */
          (expect) => expect.from(() => outside_function(42))
            .exists_type('result.multiplier', "number")
            .exists_type('result.cash', "number")
            .is("result.multiplier", 6.6535077938434775)
            .is("result.cash", 5589)
        )
        globals.test.test("different file function. Creating an 'a' tag", /** @param {Expect} expect */
          (expect) => expect.from(() => other_file_test())
            .exists("result")
            .exists("result.tagName")
            .is("result.tagName", "A")
        )
        //--------------------------------------------
      })
  );

  test.test("Console logging inside test", /** @param {Expect} expect  */
    (expect) => expect.from( /** @param {{test: Test}} globals  */
      (globals) => {
        globals.test.describe("Console inner test", () => {
          globals.test.test("log x1", /** @param {Expect} expect */
            (expect) => expect.from(() => console.log('e'))
              .expect("log", "e", 1)
          )
          globals.test.test("log x5", /** @param {Expect} expect */
            (expect) => expect.from(() => { for (let i = 0; i < 5; i++) console.log('e2') })
              .expect("log", "e2", 5)
          )
          globals.test.test("warn x1", /** @param {Expect} expect */
            (expect) => expect.from(() => console.warn('e3'))
              .expect("warn", "e3", 1)
          )
          globals.test.test("warn x5", /** @param {Expect} expect */
            (expect) => expect.from(() => { for (let i = 0; i < 5; i++) console.warn('e4') })
              .expect("warn", "e4", 5)
          )
          globals.test.test("error x1", /** @param {Expect} expect */
            (expect) => expect.from(() => console.error('e5'))
              .expect("error", "e5", 1)
          )
          globals.test.test("error x5", /** @param {Expect} expect */
            (expect) => expect.from(() => { for (let i = 0; i < 5; i++) console.error('e6') })
              .expect("error", "e6", 5)
          )
          globals.test.test("info x1", /** @param {Expect} expect */
            (expect) => expect.from(() => console.info('e7'))
              .expect("info", "e7", 1)
          )
          globals.test.test("info x5", /** @param {Expect} expect */
            (expect) => expect.from(() => { for (let i = 0; i < 5; i++) console.info('e8') })
              .expect("info", "e8", 5)
          )
          globals.test.test("debug x1", /** @param {Expect} expect */
            (expect) => expect.from(() => console.debug('e9'))
              .expect("debug", "e9", 1)
          )
          globals.test.test("debug x5", /** @param {Expect} expect */
            (expect) => expect.from(() => { for (let i = 0; i < 5; i++) console.debug('e10') })
              .expect("debug", "e10", 5)
          )
          globals.test.test("log x1 warn x1 error x1 info x1 debug x1", /** @param {Expect} expect */
            (expect) => expect.from(() => {
              console.log('e11');
              console.warn("e11");
              console.error("e11");
              console.info("e11");
              console.debug("e11");
            })
              .expect("log", "e11", 1)
              .expect("warn", "e11", 1)
              .expect("error", "e11", 1)
              .expect("info", "e11", 1)
              .expect("debug", "e11", 1)
          )
        }, true);

        globals.test.describe("Console inner test, with uneven expect", () => {
          globals.test.test("log x1 but expect 2", /** @param {Expect} expect */
            (expect) => expect.from(() => console.log('e12'))
              .expect("log", "e12", 2)
          )
          globals.test.test("warn x2 but expect 1", /** @param {Expect} expect */
            (expect) => expect.from(() => { console.warn('e13'); console.warn('e3'); })
              .expect("warn", "e13", 1)
          )
          globals.test.test("error x1 with no catch", /** @param {Expect} expect */
            (expect) => expect.from(() => console.error('e14'))
          )
          globals.test.test("info x1 but catch debug", /** @param {Expect} expect */
            (expect) => expect.from(() => console.info('e15'))
              .expect("debug", "e15", 1)
          )
          globals.test.test("debug x1", /** @param {Expect} expect */
            (expect) => expect.from(() => console.debug('e16'))
              .expect("debug", "e16", 1)
          )
        }, true)
      })
      .expect("error", "e5", 1)
      .expect("error", "e6", 5)
      .expect("error", "e11", 1)
      .expect("error", "e14", 1)
      .expect("debug", "e16", 1)

      .expect("error", "%cExpect Test:%c color: lime  Failed: Expected 2 log with msg: e12. Found 1 instead")
      .expect("error", "%cExpect Test:%c color: lime  Failed: Expected 1 debug with msg: e15. Found 0 instead")
      .expect("error", "%cTest results:%c color: orange  Failed (0/1): (expect) Expected 2 log with msg: e12. Found 1 instead")
      .expect("error", "%cTest results:%c color: orange  Failed (1/3): Found '1 errors, 0 throws' that were not expected during testing.")
      .expect("error", "%cTest results:%c color: orange  Failed (1/4): (expect) Expected 1 debug with msg: e15. Found 0 instead")
  );

  test.test("Throw", /** @param {Expect} expect  */
    (expect) => expect.from( /** @param {{test: Test}} globals  */
      () => {
        throw new Error("Test error")
      })
      .catch_throw(Error, "Test error")
  );

});
