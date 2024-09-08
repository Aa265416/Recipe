import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from './auth/auth-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private authservice: AuthServiceService){}

  ngOnInit(): void {
   this.authservice.autoLogin();
  }
  OddNumbers:number[] = [];
  EvenNumbers:number[] = [];

  loadedFeature = 'recipe';

  title = 'UdemyProject';
  serverElements = [{type: 'server', name: 'TestServer', content: 'This is for test!'}];


  OnNavigate(feature : string){
this.loadedFeature = feature;
  }
  
  OnServerAdded(serverData: {serverName: string, serverContent: string}){
    this.serverElements.push({
      type: 'server',
      name: serverData.serverName,
      content: serverData.serverContent
    })
      }
    
  OnBluePrintAdded(serverData: {serverName: string, serverContent: string}){
        this.serverElements.push({
          type: 'blueprint',
          name: serverData.serverName,
          content: serverData.serverContent
        })
      }
      OnIntervalFired(firedNumber : number){
        if(firedNumber % 2 === 0){
          this.EvenNumbers.push(firedNumber)
        }else{
          this.OddNumbers.push(firedNumber)
        }
      }
}
