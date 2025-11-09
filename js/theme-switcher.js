// Theme switcher: injects a small selector and persists choice in localStorage
(function(){
  const THEMES = ['light','grey','maroon'];
  const storageKey = 'site-theme';

  function applyTheme(theme){
    if(!theme) theme = 'light';
    document.documentElement.setAttribute('data-theme', theme === 'light' ? '' : theme);
  }

  function saveTheme(theme){
    try{ localStorage.setItem(storageKey, theme); }catch(e){/* ignore */}
  }

  function readTheme(){
    try{ return localStorage.getItem(storageKey) || 'light'; }catch(e){ return 'light'; }
  }

  // build UI
  function createUI(initial){
    const container = document.createElement('div');
    container.className = 'theme-switcher';
    container.setAttribute('aria-hidden','false');

    const label = document.createElement('label');
    label.textContent = '';
    label.setAttribute('for','theme-select');

    const select = document.createElement('select');
    select.id = 'theme-select';

    THEMES.forEach(t => {
      const o = document.createElement('option');
      o.value = t;
      o.textContent = t.charAt(0).toUpperCase() + t.slice(1);
      if(t === initial) o.selected = true;
      select.appendChild(o);
    });

    select.addEventListener('change', function(){
      const v = this.value;
      applyTheme(v);
      saveTheme(v);
    });

    container.appendChild(select);
    document.body.appendChild(container);
  }

  // init
  document.addEventListener('DOMContentLoaded', function(){
    const theme = readTheme() || 'light';
    applyTheme(theme);
    createUI(theme);
  });
})();
