import { Component, ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  score: number;
  fullName:string;
  code:string;
  optionNumber: any;
  optionTitle: any;
  lowestScore:number = 0;
  highestScore:number = 0;

  private Data:Array<any> = new Array<any>();


  constructor(public toastr: ToastsManager, vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  showSuccess() {
   this.toastr.success('Registro agregado!', 'Exito!', {toastLife: 3000});
  }

  showWarn(message: string){
    this.toastr.warning(message, 'Cuidado!', {toastLife: 3000})
  }

  showError(code: string) {
        this.toastr.error(`Registro con código ${code} eliminado!`, 'Oops!'),  {toastLife: 3000};
      }

      private handlePromScore(){
        console.log(this.Data.length)
        let sum = 0;
        let cont = 0;
        this.Data.forEach(element => {
          sum += parseInt(element.score);
          cont ++;
        }); 


        this.optionNumber = sum/this.Data.length;
        this.optionTitle = "Promedio de Notas"
        console.log(this.optionNumber)


      }

      private handleHighestScore(){
        this.optionNumber = this.highestScore;
        this.optionTitle = "Nota Mayor"
      }
      private handleLowestScore(){
        this.optionNumber = this.lowestScore;
        this.optionTitle = "Nota Menor"
      }
  private handleSubmit(){
    console.log(this.score)
   if(this.score == undefined || this.fullName == undefined || this.code == undefined){
    this.showWarn("Haz Dejado campos sin llenar o la nota no es un número!")
   }else {
      let obj = {
      id: this.Data[this.Data.length - 1] !== undefined ? (this.Data[this.Data.length - 1].id + 1) : 0,
      score: this.score,
      fullName: this.fullName,
      code: this.code,
      
    }

    if(this.score > this.highestScore) {
      this.highestScore = this.score;
    }

    if(this.lowestScore == 0 || this.score < this.lowestScore) {
      this.lowestScore = this.score;
    }

    this.Data.push(obj);
    console.log(this.Data)
    this.showSuccess();
   }
  }

  private handleRemove(id: any){
    //search for the item
    let element = this.Data.find(item => item.id == id);
    //found its index inside the array
    let index = this.Data.indexOf(element);
    //remove the element based in its index
    this.Data.splice(index, 1);

    this.showError(element.code);
  }


}
