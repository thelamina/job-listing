let filter = [];
class App {
  constructor() {}

  async getData() {
    const response = await fetch('/data.json');
    const data = await response.json();
    return data;
  }

  showSearch(){
  }
  
  showJobs() {
    this.getData().then((jobs) => {
      let output = '';
      jobs.forEach((job) => {
        output += `
          <div class="card-item">
          <div class="details">
              <img src="${job.logo}" alt="" />
              <div>
                <div class="company">
                  <h3 class="company-name">${job.company}</h3>
                  ${job.new ? '<span class="badge bg-light">New!</span>' : ''}
                  ${
                    job.featured
                      ? '<span class="badge bg-dark">Featured</span>'
                      : ''
                  }  
                  </div>
                <a href="#" class="position">
                  ${job.position}
                  </a>
                <div class="desciption">
                  <p class="date">${job.postedAt}</p>
                  <p class="contract">${job.contract}</p>
                  <p class="location">${job.location}</p>
                  </div>
              </div>
            </div>
            <div class="tag">
            <span class="role">${job.role}</span>
              <span class="level">${job.contract}</span>
              
              ${job.tools.map((lang) => {
                return '<span class="tool">' + lang + '</span>';
              })}
              
              ${job.languages.map((lang) => {
                return '<span class="language">' + lang + '</span>';
              })}
              
              </div>
          </div>
          `;
        });
      document.querySelector('.lists').innerHTML = output;
    });
  }

  makeActive() {
    console.log('I am here');
    filter.forEach((text) => {
      // text.parentElement.classList += ' current';
      console.log(text);
    });
    console.log(filter);
  }

  addToFilter(e) {
    if (
      e.target.classList.contains('tool') ||
      e.target.classList.contains('language') ||
      e.target.classList.contains('role') ||
      e.target.classList.contains('level')
    ) {
      if (!filter.includes(e.target.innerText)) {
        filter.push(e.target.innerText);
      } else {
        filter.splice(filter.indexOf(e.target.innerText), 1);
      }
    }
    document.querySelectorAll('.tag>span').forEach((el) => {
      filter.map((elem) => {
        if (el.innerText === elem) {
          el.classList.toggle('current');
        }
      });
    });
    console.log(filter);
    if (filter.length!==0) {
      document.querySelector('.search-bar').style.display = 'block';
    }
    // console.log(filter);
  }
}

const Init = new App();
Init.showJobs();
Init.showSearch();
document.body.addEventListener('click', Init.addToFilter);
