var ShowHubLib = (function (exports) {
    'use strict';

    // src/GitBanner.js

    class GitBanner {
        constructor({
            username = "githubuser",
            //avatar = "",
            duration = 3000,
            background = "#010409",
            textColor = "#fff"
        } = {}) {
            this.username = username;
            //this.avatar = avatar;
            this.duration = duration;
            this.background = background;
            this.textColor = textColor;
        }

        injectStyles() {
            const style = document.createElement("style");
            style.textContent = `
    body { margin: 0; }

    /* text classes */
    .reveal {
      position: relative;
      display: inline-block;
      overflow: hidden;
      opacity: 1;
    }

    .reveal::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: ${this.background};
      transform: translateX(0);
      transition: transform 1.5s ease;
    }

    .reveal.active::before {
      transform: translateX(100%);
    }

    /* banner classes */
    .banner {
      position: fixed;
      top: 0;
      left: -100vw;
      background-color: ${this.background};
      padding: 10px 20px;
      transition: left 1s ease;
      display: flex;
      align-items: center;
      gap: 10px;
      z-index: 9999;
      width: 100vw;
      height: 100vh;
      justify-content: center;
    }

    .banner.active { left: 0; }

    @keyframes bannerExit {
      0%   { left: 0; }
      40%  { left: 150px; }
      60%  { left: 0; }
      100% { left: 120%; }
    }

    .banner.exit {
      animation: bannerExit 2s ease forwards;
    }
    `;
            document.head.appendChild(style);
        }

        createBanner() {
            const banner = document.createElement("div");
            banner.className = "banner";

            const content = document.createElement("div");
            content.style.display = "flex";
            content.style.alignItems = "center";
            content.style.gap = "15px";

            const githubLink = document.createElement("a");
            githubLink.href = `https://github.com/${this.username}`;
            githubLink.target = "_blank";
            githubLink.innerHTML = `
      <svg height="32" style="background: white; border-radius: 50%;" aria-hidden="true"
        viewBox="0 0 24 24" version="1.1" width="32">
        <path d="M12 1C5.923 1 1 5.923 1 12c0 4.867 3.149 8.979 7.521 10.436.55.096.756-.233.756-.522 
        0-.262-.013-1.128-.013-2.049-2.764.509-3.479-.674-3.699-1.292-.124-.317-.66-1.293-1.127-1.554
        -.385-.207-.936-.715-.014-.729.866-.014 1.485.797 1.691 1.128.99 1.663 2.571 1.196 3.204.907
        .096-.715.385-1.196.701-1.471-2.448-.275-5.005-1.224-5.005-5.432 0-1.196.426-2.186 1.128-2.956
        -.111-.275-.496-1.402.11-2.915 0 0 .921-.288 3.024 1.128a10.193 10.193 0 0 1 2.75-.371c.936 0 
        1.871.123 2.75.371 2.104-1.43 3.025-1.128 3.025-1.128.605 1.513.221 2.64.111 2.915.701.77 
        1.127 1.747 1.127 2.956 0 4.222-2.571 5.157-5.019 5.432.399.344.743 1.004.743 2.035 
        0 1.471-.014 2.654-.014 3.025 0 .289.206.632.756.522C19.851 20.979 23 16.854 23 12
        c0-6.077-4.922-11-11-11Z"></path>
      </svg>`;

            const text = document.createElement("span");
            text.className = "reveal";
            text.innerText = `https://github.com/${this.username}/`;
            text.style.fontSize = "20px";
            text.style.color = this.textColor;
            text.style.fontFamily = `"GitHub Mono", SFMono-Regular, Consolas, monospace`;

            if (this.avatar) {
                const avatarImg = document.createElement("img");
                avatarImg.src = this.avatar;
                avatarImg.style.height = "29px";
                content.appendChild(avatarImg);
            }

            content.appendChild(githubLink);
            content.appendChild(text);
            banner.appendChild(content);

            document.body.appendChild(banner);
            this.banner = banner;
            this.text = text;
        }

        show() {
            this.injectStyles();
            this.createBanner();

            window.addEventListener("load", () => {
                this.banner.classList.add("active");

                setTimeout(() => this.text.classList.add("active"), 600);
                setTimeout(() => this.banner.classList.add("exit"), this.duration);
            });
        }
    }

    exports.GitBanner = GitBanner;

    return exports;

})({});
