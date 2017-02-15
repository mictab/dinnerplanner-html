/**
 * Created by michel on 2/15/17.
 */

var ListOfDishesController = function(view, model){
    $(".dish img").on("click", function(){
        $("#container2").css("display", "none");
        model.setSelectedDishId($(this).parent().attr("dish_id"));
        $("#container3").css("display", "block");
    })
};