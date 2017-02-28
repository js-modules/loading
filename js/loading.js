
;(function(window,document,undefined,$){
    $.leafLoading = {
        init:function(options){
            var opts = $.extend({},this.defaults,options);
            var loading = this.template(opts);
            this.position(loading);
            this.events(loading,opts);
        },
        template:function(opts){
            var leafLoading = $("#leafLoading");
            if(leafLoading)leafLoading.remove();
            var loadingDom = $("<div id='leafLoading' class='animated fadeInLeftBig'>"+opts.content+"</div>");
            loadingDom.css({
                padding: "8px 16px",
                background: "#000",
                display: "inline-block",
                color: "#fff",
                position:"fixed",
                borderRadius:4,
                boxShadow:"5px 5px 5px #4D5558"
            });
            $("body").append(loadingDom);
            return loadingDom;
        },
        position:function(loading){
            var winw = $(window).width();
            var winh = $(window).height();
            var lw = loading.width();
            var lh = loading.height();
            var left = (winw - lw)/2;
            var top = (winh - lh)/2;
            loading.css({left:left,top:top});
        },
        events:function(loading,opts){
            $(window).resize(function(){
                $.leafLoading.position(loading);
            });
            loading.on("click",function(){
                $(this).remove("animated fadeInLeftBig").addClass("animated fadeOutRightBig")[opts.animate](3000,function(){
                    $(this).remove();
                });
            });
            if(opts.time){
                if(loading.timer)clearTimeout(loading.timer);
                loading.timer = setTimeout(function(){
                    loading.trigger("click");
                    clearTimeout(loading.timer);
                },opts.time*1000);
            }
        }

    };
    $.leafLoading.defaults = {
        content:"请稍后,数据加载中...",
        animate:"fadeOut",
        time:0
    }
})(window,document,undefined,jQuery);
