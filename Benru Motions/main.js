const heroSection = document.querySelector('#heroSection');
const searchBtn = document.querySelector('#searchBtn');
const searchBox = document.querySelector('#searchBox');
const respp = document.querySelector('#respp');
const mainDiv = document.querySelector("MAIN");
const showContainer = document.querySelector("#showContainer");
const loader = document.querySelector("#loader");

/* Lets clear the previous searches made by user*/
searchBox.value = "";

searchBox.addEventListener('input', async () =>{
 
    /* First of all lets clear the previous results and do another request */
    showContainer.innerHTML = "";
    loader.style.display = 'block';

    //change/toggle the height of the hero section when something get typed in search box...
    if(searchBox.value.trim() != ''){
     heroSection.classList.replace("is-medium","is-small");
    } else {
        heroSection.classList.replace("is-small","is-medium");
    }

      res = await displayTvShows(searchBox.value);
     console.log(res);


});

const fetchTvShows = async (Qry) => {
   /* lets clear the previous results and do another request */
    showContainer.innerHTML = "";
     
    let config = { params: { q: Qry } };
    let resp = await axios.get('http://api.tvmaze.com/search/shows',config);
    return resp.data;
}

const displayTvShows = async (Qry) => {
    let resp = await fetchTvShows(Qry);
    /* lets clear the previous results and do another request */
    showContainer.innerHTML = "";
    
    loader.style.display = 'none'; // remove the loading scene...
    for(let each of resp)
    {
        /* ------------- collect data from object and assign it to variables -------------------- */
        let summary;
        if(each.show.summary) {
           summary = String(each.show.summary); 
           summary = summary.replace("<p>","").replace("</p>",""); //remove 'p' tag from the summary feched from api
        } else summary = 'Not availble';

        let img; if(each.show.image) img = each.show.image.medium;  else img = 'noImgAvailable.png';
        let site; if(each.show.officialSite) site = each.show.officialSite;  else site = 'Not available';
        let country; if(each.show.network) country = each.show.network.country.name;  else country = 'unknown';
        let language; if(each.show.language) language = each.show.language;  else language = 'Not mentioned';
        let rating; if(each.show.rating.average) rating = each.show.rating.average;  else rating = 'Not mentioned';

        var htmlCode = `
          <div class="column is-2-fullhd is-3-desktop is-4-tablet is-12-mobile">
            <div class="card">
                <div class="card-image">
                    <figure class="image">
                      <img src="${img}" alt="Placeholder image">
                    </figure>
                </div>
                <div class="card-content">
                  <div class="media">
                     <div class="media-content">
                        <p class="title is-4 fontRoboto">${each.show.name}</p>
                        <p class="subtitle is-size-7"><a class="fontRoboto" target="_blank" href="${site}"><u>Watch now</u></a></p>
                     </div>
                  </div>
                  <div class="content has-text-left fontRoboto is-size-7">
                  <span class="textHeading">Language: </span>&nbsp;${language}
                    <div class='pt-1'></div>
                    <span class="textHeading">Country: </span>&nbsp;${country}`;
                       if( (each.show.genres) && (each.show.genres.length =! 0) ){
                          htmlCode += `<div class='pt-1'></div><span class="textHeading">Genres: </span>`;
                          for(let gen of each.show.genres){
                             htmlCode += `${gen}&comma;&nbsp;`;
                          }
                        }
                    htmlCode +=`
                    <div class='pt-1'></div>
                    <span class="textHeading">Rating: </span> ${rating}
                    <div class='pt-1'></div>
                    <span class="textHeading">Summary: </span> ${summary}
                  </div>
                </div>
            </div>
          </div>
         `;

            showContainer.innerHTML += htmlCode;
    }
}




