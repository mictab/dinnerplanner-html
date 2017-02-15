/**
 * Created by michel on 2/15/17.
 */

var HomeScreenController = function(view, model) {
    var startBtn = $("#start");

    startBtn.click(function() {
        $("#container1").css('display', 'none');
        $("#container2").css('display', 'block');
        $("#view4").css("display", "none");
    });
};