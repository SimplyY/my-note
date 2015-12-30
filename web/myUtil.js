myUtil = {
    // url = http://127.0.0.1:8080/JnPlant/scene?scene_id=1&user_id=2
    // return Object {scene_id: "1", user_id: "2"}
    getQureyParams: function (url) {
        var searchParams = {};

        var qurey = url.split('?');
        // scene_id=1&user_id=2
        qurey = qurey[qurey.length -1];

        var params = qurey.split('&');
        for (var i = 0; i < params.length; i++) {
            // scene_id=1
            var keyValue = params[i].split('=');
            searchParams[keyValue[0]] = keyValue[1];
        }

        return searchParams;
    }

};

function isInArray(object, array) {
    for (var i = 0; i < array.length; i++) {
        if (JSON.stringify(object) === JSON.stringify(array[i])) {
            return true;
        }
    }
    return false;
}

Function.prototype.getMultilines = function () {
    return this.toString().slice(15,-4);
};
var test_grammar = function(){/*
E
E->E+T
E->T
T->T*F
T->F
F->(E)
F->i
*/}.getMultilines();

// 重复字符串
String.prototype.repeat = function(num){//创建repeat方法
    return new Array(num + 1).join(this);//创建个数为重复次数+1的数组，用字符串自身做为分隔符连接起来
};

// 得到数组最后一个元素，浅复制
Array.prototype.getLastElement = function () {
    return this[this.length - 1];
};
