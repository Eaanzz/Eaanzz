$(document).ready(function () {
  /*
   * Main variables
   */
  var content = [
    {
      title: "Rehan Sayang Vivi",
      desc: "",
    },
    {
      title: "",
      desc: "Meski jarak memisahkan kita, cintaku padamu tidak pernah berkurang sedikit pun. Setiap kali kita berbicara, aku merasa semakin dekat denganmu, seperti jarak tidak ada artinya. Dalam setiap pesan, video call, dan momen-momen kecil yang kita bagikan, aku merasakan cinta kita tumbuh semakin kuat.",
    },
    {
      title: "",
      desc: "Kita mungkin tidak selalu bisa bersama secara fisik, tapi hatiku selalu bersamamu. Setiap malam sebelum tidur, aku memikirkanmu dan berharap kita bisa segera bertemu. Aku menghargai setiap momen yang kita habiskan bersama, meski hanya melalui layar. Kamu adalah alasan di balik senyumku setiap hari, dan aku tahu bahwa kita akan bisa melewati ini semua.",
    },
    {
      title: "",
      desc: "Jarak ini hanya sementara, dan aku percaya pada cinta kita. Suatu hari nanti, kita akan bisa berada di sisi satu sama lain tanpa ada jarak yang menghalangi. Sampai saat itu tiba, aku akan terus mencintaimu dengan sepenuh hati, menantikan hari di mana kita akhirnya bisa bersama tanpa ada batasan.",
    },
    {
      title: "Rehan Sayang Vivi",
      desc: "Lovyuu Moree Sayangg🩷🩷",
    },
  ];
  var currentPage = 0;
  //generate content
  for (var i = 0; i < content.length; i++) {
    //split content letters to array
    for (var obj in content[i]) {
      //if string
      if (typeof content[i][obj] === "string") {
        content[i][obj] = content[i][obj].split("");
        continue;
      }
      //if array (grouped text)
      else if (typeof content[i][obj] === "object") {
        var toPush = [];
        for (var j = 0; j < content[i][obj].length; j++) {
          for (var k = 0; k < content[i][obj][j].length; k++) {
            toPush.push(content[i][obj][j][k]);
          }
        }
        content[i][obj] = toPush;
      }
    }
    //set text to
    $("#segments").append(
      '<div class="letters-wrap mutable"><div class="soup-title"></div><div class="soup-desc"></div></div>'
    );
    setText();
    //clone to data
    $("#segments").append(
      '<div class="letters-wrap position-data"><div class="soup-title"></div><div class="soup-desc"></div></div>'
    );
    setText();
  }
  //initial arrangement
  arrangeCurrentPage();
  scrambleOthers();
  /*
   * Event handlers
   */
  $(window).resize(function () {
    arrangeCurrentPage();
    scrambleOthers();
  });
  $("#soup-prev").hide();
  $("#soup-prev").click(function () {
    $("#soup-next").show();
    currentPage--;
    if (currentPage === 0) {
      $("#soup-prev").hide();
    }
    arrangeCurrentPage();
    scrambleOthers();
  });
  $("#soup-next").click(function () {
    $("#soup-prev").show();
    currentPage++;
    if (currentPage === content.length - 1) {
      $("#soup-next").hide();
    }
    arrangeCurrentPage();
    scrambleOthers();
  });
  /*
   * Functions
   */
  function arrangeCurrentPage() {
    for (var i = 0; i < content[currentPage].title.length; i++) {
      $(".mutable:eq(" + currentPage + ") > .soup-title > .letter")
        .eq(i)
        .css({
          left:
            $(".position-data:eq(" + currentPage + ") > .soup-title > .letter")
              .eq(i)
              .offset().left + "px",
          top:
            $(".position-data:eq(" + currentPage + ") > .soup-title > .letter")
              .eq(i)
              .offset().top + "px",
          color: "#111",
          zIndex: 9001,
        });
    }
    for (var i = 0; i < content[currentPage].desc.length; i++) {
      $(".mutable:eq(" + currentPage + ") > .soup-desc > .letter")
        .eq(i)
        .css({
          left:
            $(".position-data:eq(" + currentPage + ") > .soup-desc > .letter")
              .eq(i)
              .offset().left + "px",
          top:
            $(".position-data:eq(" + currentPage + ") > .soup-desc > .letter")
              .eq(i)
              .offset().top + "px",
          color: "#111",
          zIndex: 9001,
        });
    }
  }

  function setText() {
    var j;
    for (j = 0; j < content[i].title.length; j++) {
      $(".soup-title")
        .last()
        .append('<span class="letter">' + content[i].title[j] + "</span>");
    }
    for (j = 0; j < content[i].desc.length; j++) {
      $(".soup-desc")
        .last()
        .append('<span class="letter">' + content[i].desc[j] + "</span>");
    }
  }

  function scrambleOthers() {
    for (var i = 0; i < content.length; i++) {
      //don't scramble currentPage
      if (currentPage === i) continue;
      var parts = [
        ["title", ".soup-title"],
        ["desc", ".soup-desc"],
      ];
      //apply to .title h1s and .desc ps
      for (var j = 0; j < parts.length; j++) {
        for (var k = 0; k < content[i][parts[j][0]].length; k++) {
          //define random position on screen
          var randLeft = Math.floor(Math.random() * $(window).width());
          var randTop = Math.floor(Math.random() * $(window).height());
          //defining boundaries
          var offset = $(".position-data").eq(currentPage).offset();
          var bounds = {
            left: offset.left,
            top: offset.top,
            right: $(window).width() - offset.left,
            bottom: $(window).height() - offset.top,
          };
          var middleX =
            bounds.left + $(".position-data").eq(currentPage).width() / 2;
          var middleY =
            bounds.top + $(".position-data").eq(currentPage).height() / 2;
          //finally, apply all the scrambles
          $(".mutable:eq(" + i + ") > " + parts[j][1] + " > .letter")
            .eq(k)
            .css({
              left: randLeft,
              top: randTop,
              color: "#DDD",
              zIndex: "initial",
            });
        }
      }
    }
  }
});
