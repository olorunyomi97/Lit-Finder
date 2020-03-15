$(document).ready(function() {
    //I need an Event for when I start to type to catch what I am typing //
    $('#searchUser').on('keyup', function(e) {
        // passing in an event parameter to get whatever we're typing in //
        let username = e.target.value;

        //make request to github through Ajax //
        $.ajax({
            url: 'https://api.github.com/users/' + username,
            data: {
                client_id: 'dc385da78f0ae746690f',
                client_secret: 'caeaac48cef84ae1346d94aca892dd75104b5e82',
            }
        }).done(function(user) {
            $.ajax({
                url: 'https://api.github.com/users/' + username + '/repos',
                data: {
                    client_id: 'dc385da78f0ae746690f',
                    client_secret: 'caeaac48cef84ae1346d94aca892dd75104b5e82',
                    sort: 'created: asc',
                    per_page: 5

                }
            }).done(function(repos) {
                $.each(repos, function(index, repo) {
                    $('#repos').append(`
                    <div class="well">
                        <div class="row">
                            <div class="col-md-7">
                                <strong>${repo.name}</strong>: ${repo.description}                            </div>

                            <div class="col-md-3">
                            <span class="label label-default">Forks: ${repo.forks_count}</span>
                            <span class="label label-primary">Watchers: ${repo.watchers_counts}</span>
                            <span class="label label-success">Stars: ${repo.stargazers_count}</span>
                            </div>

                            <div class="col-md-2">
                            <a href="${repo.html_url}" target="_blank" class="btn btn-default">Repo Page</a>
                            </div>
                        </div>
                    </div>
                    `);
                })
            });
            //template literals (part of ES6)
            $('#profile').html(`
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h3 class="panel-title"> ${user.name} </h3>
                    </div>
                    <div class="panel-body">
                        <div class="row">
                            <div class="col-md-3">
                                <img style="width:100%" class="thumbnail" src="${user.avatar_url}">
                                <a target="_blank" class="btn btn-danger btn-block" href=${user.html_url}">View Profile</a>
                            </div>
                            <div class="col-md-9">
                                <span class="label label-default">Public Repos: ${user.public_repos}</span>
                                <span class="label label-primary">public Gists: ${user.public_gists}</span>
                                <span class="label label-success">Followers: ${user.public_followers}</span>
                                <span class="label label-info">Following: ${user.public_following}</span>
                                <br><br>
                                <ul class="list-group">
                                    <li class="list-group-item">Company: ${user.company}</li>
                                    <li class="list-group-item">blog: ${user.blog}</li>
                                    <li class="list-group-item">location: ${user.location}</li>
                                    <li class="list-group-item">member since: ${user.createed_at}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <h3 class="page-header">Latest Repos</h3>
                <div id="repos"></div>
            `);
        });
    });
});