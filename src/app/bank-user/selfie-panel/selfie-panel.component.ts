import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-selfie-panel',
  templateUrl: './selfie-panel.component.html',
  styleUrls: ['./selfie-panel.component.scss']
})
export class SelfiePanelComponent implements AfterViewInit, OnDestroy {

  constructor() { }

  @ViewChild('video') video:any; 

  stream: MediaStream | null = null

  ngAfterViewInit() {
    let _video=this.video.nativeElement;
    if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
                            .then(stream => {
                              this.stream = stream
                              _video.srcObject = stream;
                              _video.play();
                            })
    }
  }

  ngOnDestroy() {
    this.stream?.getVideoTracks().forEach((track: MediaStreamTrack) => track.stop())
  }

}
