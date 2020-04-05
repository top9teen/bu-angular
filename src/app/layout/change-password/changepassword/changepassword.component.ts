import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { ApiServiceModule } from '../../api-service/api-service.module';
import { Router } from '@angular/router';
import { User,UserModel, UserService } from './../../../shared/guard/user.service';
@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.scss']
})
export class ChangepasswordComponent implements OnInit {

  constructor(
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder,
    private apiService: ApiServiceModule,) {


  }
  changePassword: FormGroup = this.fb.group({
    passWord: this.fb.control('', Validators.required),
    passWordNew: this.fb.control('', Validators.required),
    passWordOld: this.fb.control('', Validators.required),
  });

  onSavePassword(){
    const obj = this.changePassword.value;
    // debugger;
    if(this.userService._userModel.passWord == obj.passWord){
      if(obj.passWordNew == obj.passWordOld){
        const jsondata = {
          'passWord':obj.passWordNew,
          'userId' :this.userService._userModel.userId
        }
        this.apiService.saveChangePassword(jsondata);
        this.userService._userModel.passWord = obj.passWordNew;
        alert('เปลี่ยนรหัสผ่านสำเร็จ')
        this.router.navigateByUrl('/RefrshComponent', {skipLocationChange: true}).then(()=>
        this.router.navigate(['/home']));
      }else{
        alert('รหัสผ่านใหม่ไม่ตรงกัน')
        this.onRef();
      }
    }else{
      alert('รหัสผ่านเดิมไม่ถูกต้อง')
      this.onRef();
    }
  }

  onRef(){
    this.router.navigateByUrl('/RefrshComponent', {skipLocationChange: true}).then(()=>
    this.router.navigate(['/change-password/change']));
  }
  onBack(){
    this.router.navigateByUrl('/RefrshComponent', {skipLocationChange: true}).then(()=>
    this.router.navigate(['/home']));
  }
  ngOnInit() {
  }

}
