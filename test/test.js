const chai = require("chai"),
  assert = chai.assert,
  expect = chai.expect,
  should = chai.should();
const assertArrays = require("chai-arrays");
chai.use(assertArrays);
const digioTest = require("../index");

describe("Parse log file", () => {
  before(() => {});

  describe("Parsing log file", () => {
    it("should take .log file and return an array", function () {
      expect(digioTest.parseLogByLine()).to.be.array();
    });
    describe("Returned Array", () => {
      it("Object in Array has property: ip_address", function () {
        expect("ip_address" in digioTest.parseLogByLine()[0]).to.be.true;
      });
      it("Object in Array has property: remote_log_name", function () {
        expect("remote_log_name" in digioTest.parseLogByLine()[0]).to.be.true;
      });
      it("Object in Array has property: user_id", function () {
        expect("user_id" in digioTest.parseLogByLine()[0]).to.be.true;
      });
      it("Object in Array has property: date", function () {
        expect("date" in digioTest.parseLogByLine()[0]).to.be.true;
      });
      it("Object in Array has property: timezone", function () {
        expect("timezone" in digioTest.parseLogByLine()[0]).to.be.true;
      });
      it("Object in Array has property: request_method", function () {
        expect("request_method" in digioTest.parseLogByLine()[0]).to.be.true;
      });
      it("Object in Array has property: path", function () {
        expect("path" in digioTest.parseLogByLine()[0]).to.be.true;
      });
      it("Object in Array has property: request_version", function () {
        expect("request_version" in digioTest.parseLogByLine()[0]).to.be.true;
      });
      it("Object in Array has property: status", function () {
        expect("status" in digioTest.parseLogByLine()[0]).to.be.true;
      });
      it("Object in Array has property: length", function () {
        expect("length" in digioTest.parseLogByLine()[0]).to.be.true;
      });
      it("Object in Array has property: referrer", function () {
        expect("referrer" in digioTest.parseLogByLine()[0]).to.be.true;
      });
      it("Object in Array has property: user_agent", function () {
        expect("user_agent" in digioTest.parseLogByLine()[0]).to.be.true;
      });
    });
  });

  describe("First Test - Get Number of Unique IP addresses", () => {
    it("uniqueAddresses should be a number", function () {
      expect(digioTest.uniqueAddresses).to.be.a("number");
    });
    it("uniqueAddresses should be equal to 11", function () {
      expect(digioTest.uniqueAddresses).to.equal(11);
    });
  });

  describe("Second Test - Get  The top 3 most visited URLs", () => {
    it("mostVisitedURLs should be an array", function () {
      expect(digioTest.mostVisitedURLs).to.be.array();
    });
    it("mostVisitedURLs array should be of size", function () {
      expect(digioTest.mostVisitedURLs).to.be.ofSize(3);
    });
    it("mostVisitedURLs should be equal to ['faq', 'docs', 'blog']", function () {
      expect(digioTest.mostVisitedURLs).to.be.equalTo(["faq", "docs", "blog"]);
    });
  });

  describe("Third Test - Get top 3 most active IP addresses", () => {
    it("mostActiveIPAddresses should be a number", function () {
      expect(digioTest.mostActiveIPAddresses).to.be.array();
    });
    it("mostActiveIPAddresses array should be of size", function () {
      expect(digioTest.mostActiveIPAddresses).to.be.ofSize(3);
    });
    it("mostActiveIPAddresses should have 3 containing any of these [ '168.41.191.40', '177.71.128.21', '50.112.00.11', '72.44.32.10' ]", function () {
      expect(digioTest.mostActiveIPAddresses).to.be.containingAnyOf([
        "168.41.191.40",
        "177.71.128.21",
        "50.112.00.11",
        "72.44.32.10",
      ]);
    });
  });
});
