$(document).ready(function(){
    /********************  AJAX  ****************** */
      
    establishTables();

    /*************************** JS ***********************/





    /*************************** UI ***********************/
});

function establishTables() //its fetch tables and code of onclick on tables
{
    $("#loader").show();
    $.post("action.php",{flag:"getTable"},function(data){
        $("#loader").hide();
        $("#tables-container").html(data)
        $(".dining-table div").height($(".dining-table div").width()); //it makes width == height of table div
        var height = $(".dining-table").height();
        $(".arrows").css({
            "margin-top":height/2+10+"px"
        });
        

        $(".dining-table div").click(function(){
            var selectedTableName = $(this).children().first().html();
            obj = $(this).parent();
            $('.dining-table').not(obj).each(function(){
                $(this).hide(500);
            });
            $(".backArrow").fadeIn();
            $(".forwardArrow").fadeIn();
            tableSelected(selectedTableName);
        });
        $(".backArrow").click(function(){
            $(".forwardArrow").fadeOut();
            $("#tables-container .dining-table ").show(500);
            $(".backArrow").fadeOut();
            $("#menu-container").slideUp();
        });
    });
}
function tableSelected(tableName) //its fetch catagories and products
{
    $("#loader").show();
    data="";
    $("#menu-container").slideDown();
    $.post("action.php",{flag:"getMenu"},function(data,status){
        if(status=="success"){
            $("#loader").hide();
            $("#menu-container").html(data);

            $(".catBox").click(function(){
                width = $(this).width();
                $(this).children("ul").slideDown();
                $(this).children("div").children("span").css({
                    "transform": "rotate(180deg)",
                    "padding-left":"10px"
                });
                $(this).children("ul").css({    
                    "min-width":width+"px"
                });
                // $(".plusBtn").click(function(val){
                //     alert("clicked");
                // });

                $(".catBox").mouseleave(function(){
                    $(".catBox ul").slideUp();
                    $(this).children("div").children("span").css({
                        "transform": "rotate(0deg)",
                        "padding-left":"10px"
                    });
                });
            });
            $("#tables-container").click(function(){
                $(".catBox ul").slideUp();
            });
        }
        
    });
}
function addQ(id){
    Qid="Q"+id;
    var val = 0;
    val = parseInt($("#"+Qid).html());
    if(val<10)
        $("#"+Qid).html(++val);
}