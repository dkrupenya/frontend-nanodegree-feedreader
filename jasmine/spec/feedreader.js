/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).toBeGreaterThan(0);
        });


        /* This test loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('should have non empty url fields', function() {
            allFeeds.forEach(function(feed) {
                var url = feed.url;
                expect(typeof url).toBe('string');
                expect(url.length).toBeGreaterThan(0);
            });
        });


        /* This test loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('should have non empty name fields', function() {
            allFeeds.forEach(function(feed) {
                var name = feed.name;
                expect(typeof name).toBe('string');
                expect(name.length).toBeGreaterThan(0);
            });
        });
    });


    describe('The menu', function() {
        /* The menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('should be hidden', function() {
            expect($('body').hasClass('menu-hidden')).toBeTruthy();
        });

        /* This test ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
        it('should toggle hidden status on click', function() {
            var menuButton = $('.menu-icon-link');
            var body = $('body');
            // show menu
            menuButton.click();
            expect(body.hasClass('menu-hidden')).toBeFalsy();
            // hide menu
            menuButton.click();
            expect(body.hasClass('menu-hidden')).toBeTruthy();
        });
    });


    describe('Initial Entries', function() {
        /* This test ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        it('should load and show feed entries', function(done) {
            loadFeed(0, function() {
                var entries = $('.feed .entry');
                expect(entries.length).toBeGreaterThan(0);
                done();
            });
        });
    });

    describe('New Feed Selection', function() {
        /**
         * return an array of article titles
         */
         function getTitles() {
             return $('.feed .entry h2').map(function() {
                 return $(this).text();
             });
         }

        /**
         * compare two arrays to have all elements equal
         * @param ar1
         * @param ar2
         */
         function compareArrays(ar1, ar2) {
            if (ar1.length !== ar2.length) return false;
            for (var i = 0; i < ar1.length; i++) {
                if (ar1[i] !== ar2[i]) return false;
            }
            return true;
         }

         /* The test ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        it('should change content after loading another feed', function(done) {
            // load feed
            loadFeed(0, function() {
                // store entry titles
                var entriesTitles = getTitles();
                // load another feed
                loadFeed(1, function() {
                    var newEntriesTitles = getTitles();
                    expect(compareArrays(entriesTitles, newEntriesTitles)).toBeFalsy();
                    done();
                });
            });
        });
    });
}());
