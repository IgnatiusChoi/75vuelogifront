//2020-12-04 64기 정준혁
import $ from 'jquery';
import 'jquery-ui/ui/widgets/datepicker';
import 'jquery-ui-dist/jquery-ui.css';
//import '../CSS/datepicker.css'
export function getDatePicker(paramFmt) {
    function Datepicker() {}
    Datepicker.prototype.init = function (params) {
      this.eInput = document.createElement('input');
      this.eInput.value = params.value;
      this.eInput.classList.add('ag-input');
      this.eInput.style.height = '100%';
      $(this.eInput).datepicker({ dateFormat: 'yy-mm-dd' });
    };
    Datepicker.prototype.getGui = function () {
      return this.eInput;
    };
    Datepicker.prototype.afterGuiAttached = function () {
      this.eInput.focus();
      this.eInput.select();
    };
    Datepicker.prototype.getValue = function () {
      return this.eInput.value;
    };
    Datepicker.prototype.destroy = function () {};
    Datepicker.prototype.isPopup = function () {
      return false;
    };
    return Datepicker;
}