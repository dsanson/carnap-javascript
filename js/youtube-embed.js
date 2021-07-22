/* eslint-env jquery */

function youtubeEmbeds() {
  $('div.youtube').each(function() {
    if ($(this).attr('skip') != "true" ) {
      slug = $(this).text().split('/')[3];
      slug = slug.replace(/(\n|\r)+$/, '');
      frame = $('<iframe/>');
      frame.attr('src','https://www.youtube.com/embed/' + slug + '/?showinfo=0&modestbranding=1');
      frame.attr('frameborder', '0');
      frame.attr('allow', 'accelerometer; encrypted-media; gyroscope; picture-in-picture');
      frame.attr('allowfullscreen', 'true');
      $(this).html(frame)
    }
  });
}

function main() {
  youtubeEmbeds();
}

$(document).ready(main);
