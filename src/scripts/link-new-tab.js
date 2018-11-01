/* globals $ */
// const clog = console.log.bind(console);

// TODO: Remove this feature since it's supported natively:
// https://tildes.net/~tildes.official/43j
// The only part of this that isn't supported natively is opening users
// in a new tab but I don't think that needs stay.

chrome.storage.sync.get({
  tildesExtendedSettings: { linkNewTab: {} }
}, function(res) {
  // clog(res);
  const linkNewTab_enabled = res.tildesExtendedSettings.linkNewTab.enabled;
  const linkNewTab_type = res.tildesExtendedSettings.linkNewTab.types;

  // Everytime the user click on a link, it checks how to behave given the context and the settings
  $('a').on('click', function() {
    if (linkNewTab_enabled) {
      if(linkNewTab_type.findIndex(t => t === 'text_submissions') !== -1) {
        if($(this).parent().hasClass('topic-title') && $(this).attr('href').indexOf('http') === -1) {
          // clog('text_submissions');
          $(this).attr('target', '_blank');
        }
      }
      if(linkNewTab_type.findIndex(t => t === 'text_submissions_links') !== -1) {
        if($(this).parents().hasClass('topic-text-excerpt') || $(this).parents().hasClass('topic-full-text')) {
          // clog('text_submissions_links');
          $(this).attr('target', '_blank');
        }
      }
      if(linkNewTab_type.findIndex(t => t === 'link_submissions') !== -1) {
        if($(this).parent().hasClass('topic-title') && $(this).attr('href').indexOf('http') !== -1) {
          // clog('link_submissions');
          $(this).attr('target', '_blank');
        }
      }
      if(linkNewTab_type.findIndex(t => t === 'comment_links') !== -1) {
        if($(this).parents().hasClass('comment-text')) {
          // clog('comment_links');
          $(this).attr('target', '_blank');
        }
      }
      if(linkNewTab_type.findIndex(t => t === 'users') !== -1) {
        if($(this).hasClass('link-user')) {
          // clog('users');
          $(this).attr('target', '_blank');
        }
      }
    }
  });
});
