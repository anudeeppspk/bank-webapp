import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { benificiary } from "../../models/benificiary-details";
import{FormBuilder,FormGroup} from '@angular/forms';


@Component({
  selector: 'app-benificiary',
  templateUrl: './benificiary.component.html',
  styleUrls: ['./benificiary.component.scss']
})
export class BenificiaryComponent implements OnInit {
   
  formValue!:FormGroup;
  
  ELEMENT_DATA: benificiary[] = [
    {position: 1, benAccNum: 1234543455, name: "Anudeep", nickname: 'Anu',userAccNum:23337872893},
    {position: 2, benAccNum: 7877937333, name: "PAPKA", nickname: 'pa',userAccNum:1221233234},
    {position: 3, benAccNum: 123444542, name: "madhuu", nickname: 'mad',userAccNum:12322432},
    {position: 4, benAccNum: 1233254456, name: "ramudu", nickname: 'ram',userAccNum:43545654467},
    {position: 5, benAccNum: 1234543455, name: "Anudeep", nickname: 'Angcfgu',userAccNum:23337872893},
    {position: 6, benAccNum: 7877937333, name: "PAPKA", nickname: 'pvcvca',userAccNum:1221233234},
  ]
  constructor( private formbuilder:FormBuilder) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      benAccNum : [''],
      nickname  : [''] 

    })
  }

  displayedColumns = ['position','benAccNum', 'name', 'nickname', 'userAccNum'];

  dataSource = new MatTableDataSource<benificiary>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

}
