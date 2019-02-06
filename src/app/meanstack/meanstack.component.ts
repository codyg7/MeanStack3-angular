import { Component, OnInit } from '@angular/core';
import { MeanstackService } from '../services/meanstack';
import MeanStack from '../models/meanstack';

@Component({
  selector: 'app-meanstack',
  templateUrl: './meanstack.component.html',
  styleUrls: ['./meanstack.component.scss']
})
export class MeanstackComponent implements OnInit {

  constructor(private meanstackService: MeanstackService) { }

  //Declaring the new meanstack Object and initilizing it
  newMeanstack: MeanStack = new MeanStack();

  //An Empty list for the visible meanstack list
  meanstacksList: MeanStack[];
  editMeanstacks: MeanStack[] = [];

  ngOnInit() {
    //At component initialization the 
    this.meanstackService.getMeanStacks()
      .subscribe(meanstacks => {
        //assign the meanstacklist property to the proper http response
        this.meanstacksList = meanstacks
        console.log(meanstacks)
      })
  }

  create() {
    this.meanstackService.createMeanstack(this.newMeanstack)
      .subscribe((res) => {
        this.meanstacksList.push(res.data)
        this.newMeanstack = new MeanStack()
      })
  }

  editMeanstack(meanstack: MeanStack) {
    console.log(meanstack)
     if(this.meanstacksList.includes(meanstack)){
      if(!this.editMeanstacks.includes(meanstack)){
        this.editMeanstacks.push(meanstack)
      }else{
        this.editMeanstacks.splice(this.editMeanstacks.indexOf(meanstack), 1)
        this.meanstackService.editMeanstack(meanstack).subscribe(res => {
          console.log('Update Succesful')
         }, err => {
            this.editMeanstack(meanstack)
            console.error('Update Unsuccesful')
          })
        }
      }
    }

    doneMeanstack(meanstack:MeanStack){
      meanstack.status = 'Done'
      this.meanstackService.editMeanstack(meanstack).subscribe(res => {
        console.log('Update Succesful')
      }, err => {
        this.editMeanstack(meanstack)
        console.error('Update Unsuccesful')
      })
    }

    submitMeanstack(event, meanstack:MeanStack){
      if(event.keyCode ==13){
        this.editMeanstack(meanstack)
      }
    }

    deleteMeanstack(meanstack: MeanStack) {
      this.meanstackService.deleteMeanstack(meanstack._id).subscribe(res => {
        this.meanstacksList.splice(this.meanstacksList.indexOf(meanstack), 1);
      })
    }

}
