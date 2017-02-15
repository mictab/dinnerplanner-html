/**
 * Created by michel on 2/15/17.
 */

var View1 = function (container, model) {
    function updateHTML(title, desc) {
        container.addClass("home-screen-container");
        var homeScreenBox = $("<div>").addClass("home-screen-box");
        var homeScreenBoxUpperContent = $("<div>").addClass("home-screen-box-upper-content");

        homeScreenBox.append(homeScreenBoxUpperContent);
        container.append(homeScreenBox);
        homeScreenBoxUpperContent.append($("<h2>").text(title));
        homeScreenBoxUpperContent.append($("<hr/>"));
        homeScreenBoxUpperContent.append($("<p>").text(desc));

        var homeScreenBoxLowerContent = $("<div>").addClass("home-screen-box-lower-content");
        homeScreenBoxLowerContent.append($("<p>").text("start quickly"));
        homeScreenBoxLowerContent.append($("<button>").addClass("btn btn-primary btn-large").attr("id", "start").text("Create New Dinner"));

        homeScreenBox.append(homeScreenBoxLowerContent);
    }

    updateHTML(model.dinnerTitle, model.startDescription);
};