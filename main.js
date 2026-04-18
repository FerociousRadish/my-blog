const postListEl = document.getElementById('post-list');
const contentEl = document.getElementById('content');

async function getTitle(file) {
  try {
    const res = await fetch('posts/' + file);
    const text = await res.text();
    const match = text.match(/^#\s+(.+)$/m);
    return match ? match[1] : file.replace('.md', '');
  } catch {
    return file.replace('.md', '');
  }
}

async function loadPosts() {
  postListEl.innerHTML = '';
  
  for (const file of POSTS) {
    const title = file.replace('.md', '');
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.textContent = title;
    a.href = '#';
    a.dataset.file = file;
    a.addEventListener('click', (e) => {
      e.preventDefault();
      showPost(file, title);
    });
    li.appendChild(a);
    postListEl.appendChild(li);
  }
}

async function showPost(file, title) {
  try {
    const res = await fetch('posts/' + file);
    const text = await res.text();
    const html = marked.parse(text);
    contentEl.innerHTML = `
      <div class="container">
        <a href="#" class="back-link back-link-top" onclick="showHome(); return false;">← 返回</a>
        <article class="post-content">
          ${html}
        </article>
        <a href="#" class="back-link back-link-bottom" onclick="showHome(); return false;">← 返回列表</a>
      </div>
    `;
    postListEl.style.display = 'none';
    document.querySelector('.hero').style.display = 'none';
    document.querySelector('.future').style.display = 'none';
    contentEl.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } catch (err) {
    contentEl.innerHTML = '<p>加载失败</p>';
  }
}

window.showHome = function() {
  contentEl.classList.remove('active');
  contentEl.innerHTML = '';
  postListEl.style.display = 'block';
  document.querySelector('.hero').style.display = 'block';
  document.querySelector('.future').style.display = 'block';
};

loadPosts();