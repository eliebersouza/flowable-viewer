import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'bpmn-js-angular';//http://10.20.0.206:8090/flowable-modeler/app/rest/models/0af57454-4816-11ea-abaa-029b36ecc5ef/bpmn20
  diagramUrl = 'service/repository/deployments/2e080551-4812-11ea-8190-029b36ecc5ef/resourcedata/callSimpleSubProcess.bpmn';
  importError?: Error;
  models: any[] = [];
  flowableUrl: string = '/service/repository/deployments'
  resources: any;
  repositoryId: any;
  constructor(protected httpClient: HttpClient){

  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.httpClient.get(this.flowableUrl).subscribe((result: any) => {
      this.models = result.data;
    })
  }
  changeModel(model){
    this.httpClient.get(`${this.flowableUrl}/${model}/resources`).subscribe((response: any) => {
      this.repositoryId = model;
      this.resources = response;
    })
  }
  changeResource(resource){
    this.diagramUrl = `service/repository/deployments/${this.repositoryId}/resourcedata/${resource}`;
  }
    handleImported(event) {

    const {
      type,
      error,
      warnings
    } = event;

    if (type === 'success') {
      console.log(`Rendered diagram (%s warnings)`, warnings.length);
    }

    if (type === 'error') {
      console.error('Failed to render diagram', error);
    }

    this.importError = error;
  }

}
