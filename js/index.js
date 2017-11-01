<!---

document.onkeyup = function(evt)
{
 // credit: https://stackoverflow.com/a/14925204

 evt = evt || window.event;

 if (evt.keyCode == 27)
 {
 // hide the 'gram iframe'.
  gram_window_obj = document.getElementById('gram_iframe_window_container');
  gram_window_obj.style.display='none';

  // set the iframe src to 'blank' (to 'reset' the iframe
  // as the new page loads.)
  document.getElementById('gram_iframe').src = '../loading_iframe.html';
 }
}


function grame_iframe_open(url)
{
 // convert the URL to an 'embed' URL.
 // credit: https://stackoverflow.com/a/24746208

 embed_url = url.split('?')[0] + "embed";
 // credit: https://stackoverflow.com/a/5631547

 // test.
 // alert(embed_url);

 // set the 'view this image  on Instagram' link.
 document.getElementById('gram_iframe_view_instagram_link').href = url;

 // change the 'gram iframe' source page URL to the requested URL.
 document.getElementById('gram_iframe').src = embed_url;

 // display the 'gram iframe' div.
 document.getElementById('gram_iframe_window_container').style.display='block';
}

function gram_iframe_close()
{
 gram_window_obj = document.getElementById('gram_iframe_window_container');

 // if the 'gram iframe' is visible, hide it.
 if (gram_window_obj.style.display == 'block')
 { gram_window_obj.style.display='none'; }

 // set the iframe src to 'blank' (to 'reset' the iframe
 // as the new page loads.)
 document.getElementById('gram_iframe').src = '../loading_iframe.html';
}

function generate_gram_thumbnail_gallery(timeline_array)
{

 // initialise the 'gram thumbnail' array.
 gram_thumbnail_array = [];

 // construct the 'gram thumbnail array' by retrieving the
 //  gram items from the timeline array
 for (index in timeline_array)
 {
  // retrieve the item data array [dictionary].
  item_array = timeline_array[index];

  // retrieve the item type.
  item_type = timeline_array[index].item_type;

  // if the item is a 'gram' item,
  if (item_type == 'gram')
  {
   item_data = timeline_array[index].item_data;
   gram_thumbnail_array.push(item_data);
  }
 }

 for (index in gram_thumbnail_array)
 {
  this_gram_thumbnail_image_filename = gram_thumbnail_array[index].filename;
  this_gram_instagram_url = gram_thumbnail_array[index].instagram_url;

  // test.
  // alert('this_gram_thumbnail_image_filename: ' + this_gram_thumbnail_image_filename);

  //retrieve the 'gram item' template.
  this_gram_item_template = document.getElementById('gram_item_template').innerHTML;

  // test.
  // alert('this_gram_item_template: ' + this_gram_item_template);

  // initialise the 'gram item' output string.
  this_gram_item = this_gram_item_template;

  // pattern-replace the thumbnail filename template string with the actual value.
  thumbnail_filename_template_string = '-- thumbnail filename --';

  this_gram_item = this_gram_item.replace(thumbnail_filename_template_string,
					  this_gram_thumbnail_image_filename);

  // pattern-replace the instagram URL template string with the actual value.
  instagram_url_template_string = '-- instagram url --';

  this_gram_item = this_gram_item.replace(instagram_url_template_string,
					  this_gram_instagram_url);

  // test.
  // alert('this_gram_item: ' + this_gram_item);

  // add to the document.
  document.getElementById('gram_page_content_container').innerHTML += this_gram_item;
 }

}


function generate_tube_gallery(timeline_array)
{
 // initialise the 'tube thumbnail' array.
 tube_item_array = [];

 // construct the 'tube array' by retrieving the
 //  tube items from the timeline array
 for (index in timeline_array)
 {
  // retrieve the item data array [dictionary].
  item_array = timeline_array[index];

  // retrieve the item type.
  item_type = timeline_array[index].item_type;
  // if the item is a 'tube' item,
  if (item_type == 'tube')
  {
   item_data = timeline_array[index].item_data;

   this_tube_item_title = item_data.title;
   this_tube_item_service = item_data.service;
   this_tube_item_embed_url = create_tube_embed_url(this_tube_item_service,
						    item_data.tube_url);

   //retrieve the 'tube item' template.
   this_tube_item_template = document.getElementById('tube_item_template').innerHTML;

   // test.
   // alert('this_tube_item_template: ' + this_tube_item_template);

   // initialise the 'tube item' output string.
   this_tube_item = this_tube_item_template;

   // pattern-replace the thumbnail filename template string with the actual value.
   item_title_template_string = '-- item title --';

   this_tube_item = this_tube_item.replace(item_title_template_string,
					   this_tube_item_title);

   // pattern-replace the instatube URL template string with the actual value.
   item_url_template_string = '-- item url --';

   this_tube_item = this_tube_item.replace(item_url_template_string,
					   this_tube_item_embed_url);

   // test.
   // alert('this_tube_item: ' + this_tube_item);

   // add to the document.
   document.getElementById('tube_page_content_container').innerHTML += this_tube_item;
  }
 }

}


function generate_wall_gallery(timeline_array)
{
 // initialise the 'tube item' array.
 tube_item_array = [];

 // initialise the 'gram thumbnail' array.
 gram_thumbnail_array = [];

 // retrieve all items from the timeline array.
 for (index in timeline_array)
 {
  // retrieve the item data array [dictionary].
  item_array = timeline_array[index];

  // retrieve the item type.
  item_type = timeline_array[index].item_type;

  // if the item is a 'tube' item,
  if (item_type == 'tube')
  {
   item_data = timeline_array[index].item_data;

   // generate and insert the tube item output.
   this_tube_item_title = item_data.title;
   this_tube_item_service = item_data.service;
   this_tube_item_embed_url = create_tube_embed_url(this_tube_item_service,
					      item_data.tube_url);

   //retrieve the 'tube item' template.
   this_tube_item_template = document.getElementById('tube_item_template').innerHTML;

   // initialise the 'tube item' output string.
   this_tube_item = this_tube_item_template;

   // pattern-replace the thumbnail filename template string with the actual value.
   item_title_template_string = '-- item title --';

   this_tube_item = this_tube_item.replace(item_title_template_string,
					   this_tube_item_title);

   // pattern-replace the instatube URL template string with the actual value.
   item_url_template_string = '-- item url --';

   this_wall_page_output_item = this_tube_item.replace(item_url_template_string,
						       this_tube_item_embed_url);

   // test.
   // alert('this_wall_page_output_item: ' + this_wall_page_output_item);

  }

  // if the item is a 'gram' item,
  if (item_type == 'gram')
  {
   item_data = timeline_array[index].item_data;

   this_gram_thumbnail_image_filename = item_data.filename;
   this_gram_instagram_url = item_data.instagram_url;

   //retrieve the 'gram item' template.
   this_gram_item_template = document.getElementById('gram_item_template').innerHTML;

   // test.
   // alert('this_gram_item_template: ' + this_gram_item_template);

   // initialise the 'gram item' output string.
   this_gram_item = this_gram_item_template;

   // pattern-replace the thumbnail filename template string with the actual value.
   thumbnail_filename_template_string = '-- thumbnail filename --';

   this_gram_item = this_gram_item.replace(thumbnail_filename_template_string,
					   this_gram_thumbnail_image_filename);

   // pattern-replace the instagram URL template string with the actual value.
   instagram_url_template_string = '-- instagram url --';

   this_wall_page_output_item = this_gram_item.replace(instagram_url_template_string,
						       this_gram_instagram_url);

   // test.
   // alert('this_wall_page_output_item: ' + this_wall_page_output_item);
  }

  // add to the document.
  document.getElementById('wall_page_content_container').innerHTML += this_wall_page_output_item;

 }

}


function generate_page(page_type)
{

 // --- for page header...
 //     ...insert the user's avatar.
 user_avatar_image = 'images/' + user_avatar_image;
 eval("document.getElementById('user_avatar').style.backgroundImage=\"url(" + user_avatar_image + ")\"");
 //     ...insert the user's full name.
 document.getElementById('user_full_name').innerHTML = user_full_name;
 //     ...insert the user's short description.
 document.getElementById('user_short_description').innerHTML = user_short_description;
 //     ...insert the user's long description.
 document.getElementById('user_long_description').innerHTML = user_long_description;

 // --- for social media nav...
 //     ...insert the user's Instagram URL.
 document.getElementById('social_media_nav_instagram_url').href = user_gram_page_url;
 //     ...insert the user's Youtube URL.
 document.getElementById('social_media_nav_youtube_url').href = user_tube_page_url;
 //     ...insert the user's Twitter URL.
 document.getElementById('social_media_nav_twitter_url').href = user_twitter_page_url;
 //     ...insert the user's Snapchat URL.
 document.getElementById('social_media_nav_snapchat_url').href = user_snapchat_page_url;
 //     ...insert the user's Periscope URL.
 document.getElementById('social_media_nav_periscope_url').href = user_periscope_page_url;

 // ---


 // if the page is a 'wall' (user index) page,
 if (page_type == 'wall')
 {
  // generate the wall (index) page output.
  generate_wall_gallery(timeline_array);
 }

 // if the page is a 'gram' page,
 if (page_type == 'gram')
 {
  // generate the gram page output.
  generate_gram_thumbnail_gallery(timeline_array);

  // insert the 'gram' service and page URL.
  document.getElementById('gram_service').innerHTML = user_gram_service;
  document.getElementById('gram_page_url').href = user_gram_page_url;

  // insert the user's full name.
  document.getElementById('gram_user_full_name').innerHTML = user_full_name;
 }

 // if the page is a 'tube' page,
 if (page_type == 'tube')
 {
  // generate the tube page output.
  generate_tube_gallery(timeline_array);

  // insert the 'tube' service and page URL.
  document.getElementById('tube_service').innerHTML = user_tube_service;
  document.getElementById('tube_page_url').href = user_tube_page_url;

  // insert the user's full name.
  document.getElementById('tube_user_full_name').innerHTML = user_full_name;
 }
}

function create_tube_embed_url(tube_service, tube_item_url)
{

 // if the service is Youtube, set the regex for Youtube URLs.
 if (tube_service == 'youtube')
 { tube_regex = /^.*(youtu\.be\/|vi?\/|u\/\w\/|embed\/|\?vi?=|\&vi?=)([^#\&\?]*).*/; }

 // retrieve the tube item ID.
 tube_id = tube_item_url.match(tube_regex)[2];

 // if the service is Youtube,
 if (tube_service == 'youtube')
 { 
  // construct a Youtube embed URL.
  tube_item_embed_url = "https://www.youtube.com/embed/" + tube_id;
 }

 // test.
 // alert('tube_item_embed_url: ' + tube_item_embed_url);

 return tube_item_embed_url;
}

 //-->