const db = firebase.firestore();

let websiteRef, projectsRef;
websiteRef = db.collection("website");

var carousels = function () {
    $(".owl-carousel1").owlCarousel({
        loop: true,
        center: true,
        margin: 0,
        responsiveClass: true,
        nav: false,
        responsive: {
            0: {
                items: 1,
                nav: false
            },
            680: {
                items: 2,
                nav: false,
                loop: false
            },
            1000: {
                items: 3,
                nav: true
            }
        }
    });
};


const fetchList = async (docRef, checkVisible = true, checkOrder = true) => {
    try {
        let response = await websiteRef.doc(docRef).get();
        let answer = response.data()[docRef];
        if (checkVisible) {
            answer = answer.filter((value, index, arr) => {
                return value.show;
            });
        }
        if (checkOrder) {
            answer = answer.sort((a, b) => a.order - b.order);
        }
        return answer
    } catch (error) {
        console.log('Error fetching from Firestore: ', error);
    }
}

const displayProjects = async () => {
    let div;
    let projects = await fetchList('projects');
    // console.table(projects);
    let projectsParent = document.querySelector('#insertProjects');
    projects.forEach(project => {
        div = document.createElement('div');
        div.innerHTML = `<div>
            <div class="card text-center">
                <div class="card-body">
                    <h5>${project.name}</h5>
                    <span class="categories"><i class="fa fa-tag"> </i>${project.category}</span>
                    <p class="card-text">${project.desc}
                    </p>

                    <div class="link-box">
                        <a href="${project.details}" target="_blank">Details</a>
                    </div>
                </div>
            </div>
        </div>`;
        projectsParent.appendChild(div);
    });
    // carousels();
}

const setDescription = (descList, id) => {
    document.getElementById(id).innerHTML = ``;

    for (let index = 0; index < descList.length - 1; index++) {
        document.getElementById(id).innerHTML += `${descList[index]}<br>`;
    }
    document.getElementById(id).innerHTML += `${descList[descList.length - 1]}`;
}

const displayBio = async () => {
    let data = await fetchList('bio', false, false);
    console.table(data);
    let descList = data[0].desc;
    setDescription(descList, 'bio');
    document.getElementById('bio').innerHTML += ` Let's <a class="smoothscroll" href="#about">start scrolling</a>and learn more <a class="smoothscroll" href="#about">about me</a>.`;
}

const displayAboutMe = async () => {
    let data = await fetchList('aboutMe', false, false);
    console.table(data);
    let descList = data[0].desc;
    setDescription(descList, 'aboutMe');
    document.getElementById('aboutMe').innerHTML += ` Scroll down to my
    <a href="#portfolio" class="smoothscroll">works</a> to know more.`;
}


// displayProjects();

// displayBio();

// displayAboutMe();

