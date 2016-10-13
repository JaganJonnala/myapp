import { Component } from "@angular/core";
var imagepicker = require("nativescript-imagepicker");
// var bghttp = require("nativescript-background-http");
// var session = bghttp.session("image-upload");

@Component({
    selector: "my-app",
    templateUrl: "app.component.html",
})
export class AppComponent {
    imageUrl: string;
    fileUri: string;
    localImagePath: any;
    // public counter: number = 16;

    // public get message(): string {
    //     if (this.counter > 0) {
    //         return this.counter + " taps left";
    //     } else {
    //         return "Hoorraaay! \nYou are ready to start building!";
    //     }
    // }

    // public onTap() {
    //     this.counter--;
    // }

    // uploadHttp(fileUri) {
    //     let imageName = this.extractImageName(fileUri);
    //     var request = {
    //         url: "http://test.wpapi.xavica.com/api/PropertyAssets/PostFile",
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/octet-stream",
    //             "File-Name": imageName
    //         },
    //         description: "{ 'uploading': " + imageName + "}"
    //     };

    //     var task = session.uploadFile(fileUri, request);

    //     task.on("progress", logEvent);
    //     task.on("error", logEvent);
    //     task.on("complete", logEvent);

    //     function logEvent(e) {
    //         console.log("e------", JSON.stringify(e));
    //         console.log(e.eventName);
    //     }
    // }
    extractImageName(fileUri) {
        var pattern = /[^/]*$/;
        var imageName = fileUri.match(pattern);

        return imageName;
    }
    selectImages() {
        var context = imagepicker.create({
            mode: "single"
        });
        context
            .authorize()
            .then(function () {
                return context.present();
            })
            .then((selection) => {
                this.localImagePath = selection[0];
                this.fileUri = this.localImagePath.fileUri;
                this.imageUrl = this.localImagePath.thumb;
            }).catch(function (e) {
                console.log(e);
            });

    }
    // finalUpload() {
    //     this.uploadHttp(this.fileUri);
    // }
    upload() {
        let formData = new FormData();
        var file = this.localImagePath;
        formData.append("file", file, file.name);
        let url = 'http://test.wpapi.xavica.com/api/PropertyAssets/PostFile';
        console.log("FormData", formData);
        this.sendData(url, formData).then(result => {
            console.log("Result", result);
            // let imageUrl = "https://smamidi.blob.core.windows.net/wpimages/" + result + '.jpg';
            // console.log(imageUrl);
        });
    }
    sendData(url, formData) {
        return fetch(url, {
            method: 'POST',
            body: formData
        }).then(function (response) {
            console.log("response Code", response.status);
            if (response.status >= 200 && response.status < 400) {
                return response.text();
            }
        }).then(function (text) {
            return text;
        })
    }
}