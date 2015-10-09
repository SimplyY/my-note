// lodash


(function(window, document, undefined) {

    getImgByClipboardEvent();
    getImgByFileEvent();

    // for no jqurey
    function $(id) {return document.getElementById(id);}

    function getImgByClipboardEvent() {
        $('text-input').addEventListener('paste', function(e) {
            var clipboardDate0 = e.clipboardData.items[0];

            if (clipboardDate0.type.indexOf('image') > -1) {
                var imageFile = clipboardDate0.getAsFile();
                uploadFile(imageFile);
                e.preventDefault();
            } else if (clipboardDate0.kind === 'file') {
                alert('must be a image');
            }
        });
    }

    function getImgByFileEvent() {
        var $ = function(id) {return document.getElementById(id);};
        if (window.File && window.FileReader && window.FileList && window.Blob) {
            $('files').addEventListener('change', function (event) {
                handleFileSelect(event);
            });
        } else {
            alert('The File APIs are not fully supported in this browser.');
        }

        function handleFileSelect(event) {
            var files = event.target.files;
            for (var i = 0; i < files.length; i++) {
                fileName = files[i].name;

                // 确保图片格式
                var imgNameArray = ['jpeg', 'png', 'jpg'];
                var suffixs = fileName.split('.')[fileName.split('.').length - 1];
                if (_.indexOf(imgNameArray, suffixs) > -1) {
                    var reader = new FileReader();
                    reader.onload = (function (img) {
                        return function (e) {
                            console.log(img);
                            uploadFile(img);
                        };
                    })(files[i]);

                    reader.readAsBinaryString(files[i]);
                }
                else{
                    alert('请上传图片, 且格式为' + imgNameArray.toString());
                    return;
                }
            }
        }

    }

    function uploadFile(file) {
        // body...
    }
})(window, document);
