/**
 * Created by michel on 2/15/17.
 */

var InstructionsScreenViewController = function(view, model) {
    var backBtn = $("#final-back-btn");

    backBtn.on('click', function () {
        $("#container5").css('display', 'none');
        $("#container2").css('display', 'block');
        $("#view3").css('display', 'block');
        $("#view4").css('display', 'none');
    });
};