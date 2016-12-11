var Lab = require("lab"); // load Lab module
var lab = exports.lab = Lab.script(); //export test script
var Code = require("code"); //assertion library
var server = require("../src/index");

lab.experiment("Basic HTTP Tests", function () {
    lab.before({
        timeout: 2000
    }, (done) => {
        done();
    });
    lab.after((done) => {
        server.stop(done);
        console.log(" server stopped");
    });
    // tests
    lab.test("GET /v1/feeds (endpoint test)", function (done) {
        var options = {
            method: "GET",
            url: "/v1/feeds"
        };
        // server.inject lets you simulate an http request
        server.inject(options, function (response) {
            Code.expect(response.statusCode).to.equal(200); //  Expect http response status code to be 200 ("Ok")
            Code.expect(response.result.data).to.have.length(5); // Expect result.data has 5 records
            done();
        });
    });
    lab.test("GET /v1/feeds/{feedId} (endpoint test)", function (done) {
        var options = {
            method: "GET",
            url: "/v1/feeds/1234"
        };
        // server.inject lets you simulate an http request
        server.inject(options, function (response) {
            Code.expect(response.statusCode).to.equal(200); //  Expect http response status code to be 200 ("Ok")
            //Code.expect(response.result.data).to.have.length(5); // Expect result.data has 5 records
            done();
        });
    });
    lab.test("POST /v1/feeds/{feedId} (endpoint test)", function (done) {
        var options = {
            method: "POST",
            url: "/v1/feed",
            payload: {
                feedId: "1234",
                feedDesc: "this is feed desc"
            }
        };
        // server.inject lets you simulate an http request
        server.inject(options, function (response) {
            Code.expect(response.statusCode).to.equal(200); //  Expect http response status code to be 200 ("Ok")
            Code.expect(response.result.feedId).to.equal("1234"); // Expect result feedId as passed in payload
            Code.expect(response.result.feedDesc).to.equal("this is feed desc"); // Expect result feedDesc as passed in payload
            done();
        });
    });
});