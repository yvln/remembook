$(document).ready(() => {
  console.log('script loaded');

// CREATE REMEMBOX

$('#new-remembox').on('submit', e => {
  const newRmb = {};
  e.preventDefault();

  const newRmbData = $('#new-remembox').serializeArray();
  newRmb.rmbdate = newRmbData[0].value;
  newRmb.category = newRmbData[1].value;
  newRmb.title = newRmbData[2].value;
  newRmb.text = newRmbData[3].value;
  newRmb.img_url = newRmbData[4].value;
  newRmb.mood = newRmbData[5].value;

  $.ajax("/home/seeall", {
    method: "POST",
    data: newRmb,
    success: response => {
      alert('Your remembox has been successfully added.');
      window.location.href = "/home/seeall";
    }
  });
});

// READ REMEMBOX

$('#find-button').on('click', e => {
let kw = "";
let dt = "";

  if ($('#kw-to-find').val().length === 0) {
    kw = "nodata"
  } else {
    kw = $('#kw-to-find').val().toLowerCase();
  }

  if ($('#date-to-find').val().length === 0) {
    dt = "nodata"
  } else {
    dt = $('#date-to-find').val().toLowerCase();
  }

  if ((kw === "nodata") && (dt === "nodata")) {
    window.location.href = `/home/seeall`;
  } else {
    window.location.href = `/home/search/${kw}/${dt}`;
  }
});

// UPDATE REMEMBOX

$('#edit-remembox').on('submit', e => {
  const editRmb = {};
  e.preventDefault();
  const editRmbData = $('#edit-remembox').serializeArray();
  editRmb.remembox_id = $('#remembox_id').attr('data-id');
  editRmb.rmbdate = editRmbData[0].value;
  editRmb.category = editRmbData[1].value;
  editRmb.title = editRmbData[2].value;
  editRmb.description = editRmbData[3].value;
  editRmb.picture = editRmbData[4].value;
  editRmb.mood = editRmbData[5].value;

  $.ajax(`/home/${editRmb.remembox_id}`, {
    method: "PUT",
    data: editRmb,
    success: response => {
      alert('Your remembox has been successfully edited.');
      window.location.href = "/home/seeall";
    }
  });
});

// DELETE REMEMBOX

$('.delete-rmb-button').on('click', e => {
  const deletedRmb = {};
  deletedRmb.id = $('.rmb_to_delete_id').attr('data-id');
  const confirmation = confirm("Do you really want to delete this item?");
    if (confirmation == true) {
      $.ajax(`/home/delete/${deletedRmb.id}`, {
        method: "DELETE",
        data: deletedRmb,
        success: response => {
          alert("The remembox has been deleted.");
          window.location.href = "/home/seeall";
        }
      });
    }
});

// EDIT USER

$('#edit-profile').on('submit', e => {
    const updatedUser = {};
    e.preventDefault();
    const updatedUserData = $('#edit-profile').serializeArray();
    updatedUser.user_id = $('#user_id').attr('data-id');
    updatedUser.user_image_url = updatedUserData[0].value;
    updatedUser.fname = updatedUserData[1].value;
    updatedUser.lname = updatedUserData[2].value;
    updatedUser.email = updatedUserData[3].value;
    updatedUser.login = updatedUserData[4].value;

    $.ajax(`/user/edit/${updatedUser.user_id}`, {
      method: "PUT",
      data: updatedUser,
      success: response => {
        alert('Your profile has been successfully edited.');
        window.location.href = "/home";
      }
    });
});

// DELETE USER

$('#delete-user-button').on('click', e => {
  const deletedRmb = {};
  deletedRmb.id = $('#user_to_delete_id').attr('data-id');
  const confirmation = confirm("Do you really want to delete your account?");
    if (confirmation == true) {
      $.ajax(`/user/delete/${deletedRmb.id}`, {
        method: "DELETE",
        data: deletedRmb,
        success: response => {
          alert("You account has been deleted.");
          window.location.href = "/";
        }
      });
    }
});


}); // closes jquery
