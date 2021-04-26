(function () {
    "use strict";

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

    (function ($) {
        const displayProjects = async () => {
            let div, html;
            let projects = await fetchList('projects');
            // console.table(projects);
            let projectsParent = document.querySelector('#insertProjects');
            projects.forEach(project => {
                div = document.createElement('div');
                if (project.link) {
                    div.innerHTML = `<div>
                    <div class="card text-center">
                        <div class="card-body">
                            <h5>${project.name}</h5>
                            <span class="categories"><i class="fa fa-tag"> </i>${project.category}</span>
                            <p class="card-text">${project.desc}
                            </p>
        
                            <div class="link-box">
                                <a href="${project.details}" target="_blank">Details</a>
                                <a href="${project.link}" target="_blank">Link</a>
                            </div>
                        </div>
                    </div>
                </div>`;
                }
                else {
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
                }

                projectsParent.appendChild(div);
            });
            carousels();
        }
        // carousels();
        displayProjects();
    })(jQuery);
})();