$(function(){
    var _window = $(window),
    _header = $('.site-header'),
    heroBottom;

    _window.on('scroll',function(){
        heroBottom = $('.hero').height();
        if(_window.scrollTop() > heroBottom){
            _header.addClass('fixed');
        }
        else{
            _header.removeClass('fixed');
        }
    });

    _window.trigger('scroll');
});

$(document).ready(function(){
    $('.slide').slick({
        arrow: true,
        autoplay: true,
        autoplaySpeed: 5000, // 1s = 1000
        speed: 1000, 
        infinite: true, 
        pauseOnHover: true,
        pauseOnFocus: false,
        cssEase: 'ease', 
        slidesToShow: 4,
        slidesToScroll: 4,
        draggable: false,
        dots: true,
        prevArrow: '<button type="button" class="slick-prev nav-button"><</button>',
        nextArrow: '<button type="button" class="slick-next nav-button">></button>'
        
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('comment-form');
    const textarea = document.getElementById('text');
    const submitButton = document.getElementById('submit-button');
    const commentsSection = document.getElementById('comments-section');
    function checkFormValidity() {
        if (textarea.value.trim() === '') {
            submitButton.disabled = true;
        } else {
            submitButton.disabled = false;
        }
    }
    // ローカルストレージからコメントを読み込む
    const loadComments = () => {
        const savedComments = JSON.parse(localStorage.getItem('comments')) || [];
        commentsSection.innerHTML = '';
        savedComments.forEach(comment => {
            const commentDiv = document.createElement('div');
            commentDiv.classList.add('comment');
            commentDiv.innerHTML = `
                <div class="comment-inner">
                    <img src="images/human.png" alt="Human Icon" class="icon">
                    <div class="comment-content">
                        <strong class="name">${comment.name}</strong>
                        <small class="timestamp">${comment.timestamp}</small>
                        <p class="comment-text">${comment.text}</p>
                    </div>
                </div>
            `;
            commentsSection.appendChild(commentDiv);
        });
    };
    function addComment(event) {
        event.preventDefault();
        const name = document.getElementById('name').value.trim();
        const commentText = textarea.value.trim();
        if (commentText) {
            const commentDiv = document.createElement('div');
            commentDiv.classList.add('comment');
            const displayName = name || '名無しさん';
            const now = new Date();
            const timestamp = now.toLocaleString();
            commentDiv.innerHTML = `
                <div class="comment-inner">
                    <img src="images/human.png" alt="Human Icon" class="icon">
                    <div class="comment-content">
                        <strong class="name">${displayName}</strong>
                        <small class="timestamp">${timestamp}</small>
                        <p class="comment-text">${commentText}</p>
                    </div>
                </div>
            `;
            commentsSection.appendChild(commentDiv);
            const savedComments = JSON.parse(localStorage.getItem('comments')) || [];
            savedComments.push({ name: displayName, text: commentText, timestamp: timestamp });
            localStorage.setItem('comments', JSON.stringify(savedComments));
            form.reset();
            textarea.focus();
            submitButton.disabled = true;
        }
    }
    checkFormValidity();
    textarea.addEventListener('input', checkFormValidity);
    form.addEventListener('submit', addComment);
    loadComments();
});

document.addEventListener('DOMContentLoaded', (event) => {
    document.querySelector('.slide').classList.add('fade-in');
    
    const video = document.getElementById('backgroundVideo');
    const image = document.getElementById('backgroundImage');

    function isMobileDevice() {
        return /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent);
    }

    if (isMobileDevice()) {
        video.style.display = 'none';
        image.style.display = 'block';
    } else {
        video.style.display = 'block';
        image.style.display = 'none';

        video.addEventListener('ended', () => {
            video.currentTime = 0;
            video.play();
        });
    }
});


$(function(){
    $('a[href^="#"]').click(function(){
      var speed = 500;
      var href= $(this).attr("href");
      var target = $(href == "#" || href == "" ? 'html' : href);
      var position = target.offset().top;
      $("html, body").animate({scrollTop:position}, speed, "swing");
      return false;
    });
});