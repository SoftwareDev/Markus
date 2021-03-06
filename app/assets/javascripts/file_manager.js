/*
  new_file_field.change(function() {
    sanitized_filename_check(this);
    var fileCount = 0;
    var notTerminate = true;
    while (fileCount<this.files.length && notTerminate){
      if (this.files[fileCount].size > 3*1024*1024){
        if (!confirm('Warning, ' + this.files[fileCount].name +
            ' is ' + this.files[fileCount].size + ' bytes.' +
            ' Loading it in the web viewer may take a long time.' +
            ' Do you wish to proceed?')){
          // clear recently added file and terminate loop
          jQuery(this).val('');
          notTerminate = false;
        }
      }
    }

    return false;
  });
*/

jQuery(document).ready(function (){
  window.modal_addnew = new ModalMarkus('#addnew_dialog');
});

function submitFile(e) {
  e.submit();
}

function enableDisableSubmit() {
  var hasRows = false;

  jQuery('tbody').each(function(i) {
    var oRows = this.getElementsByTagName('tr');
    var iRowCount = oRows.length;
    if (iRowCount > 0) {
      hasRows = true;
    }
  });

  jQuery('#submit_form input[type=submit]').each(function(i) {
    jQuery(this).find('input, textarea').each(function(i) {
      if (hasRows) {
        jQuery(this).removeAttr('readonly');
      } else {
        jQuery(this).attr('readonly', 'readonly');
      }
    });
  });
}

/*
 * Strip off some local file-path garbage potentially passed by the browser.
 * Called from app/views/submissions/_file_manager_boot.js.erb
 */
function normalize_filename(new_file_name) {
  /************************************************************************
   * Note: new_file_name may include device identifiers and may be preceded
   *       by the full path to the file on the user's local system.
   * Examples:
   *     C:\\data\\folder\\file.txt  // '\' is a special char in JS
   *     D:/data/school/program.py
   *     /home/user/Documents/Class.java
   *     core.c
   ***********************************************************************/
  // Unify path separator
  var new_file_name = new_file_name.replace(/\\/g, '/');
  var slash = new_file_name.lastIndexOf('/');
  if (slash !== -1) {
    // Absolute path given, strip off preceding parts
    new_file_name = new_file_name.substring(slash + 1);
  }
  return new_file_name;
}

function populate(files_json) {
  files_table.populate(files_json).render();
  enableDisableSubmit();
}
