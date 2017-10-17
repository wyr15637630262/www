export default {
    makeText(str,time){
        $("#toast").show()
        $("#toast .toast_right").html(str);

        setTimeout(function(){
            $("#toast").hide()
        },time)
    }
}