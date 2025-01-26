// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "about",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-publications",
          title: "publications",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/publications/";
          },
        },{id: "nav-cv",
          title: "cv",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/bio/";
          },
        },{id: "news-i-have-officially-earned-my-bachelor-s-degree-in-electrical-engineering-and-computer-science-minor-at-kaist",
          title: 'I have officially earned my Bachelor’s degree in Electrical Engineering and Computer Science(minor)...',
          description: "",
          section: "News",},{id: "news-i-am-starting-my-master-s-program-at-data-mining-lab-kaist",
          title: 'I am starting my Master’s Program at Data Mining Lab @ KAIST.',
          description: "",
          section: "News",},{id: "news-i-have-officially-passed-the-master-s-oral-defense",
          title: 'I have officially passed the Master’s oral defense.',
          description: "",
          section: "News",},{id: "news-my-paper-active-learning-for-continual-learning-keeping-the-past-alive-in-the-present-is-accepted-at-iclr-2025",
          title: 'My paper Active Learning for Continual Learning: Keeping the Past Alive in the...',
          description: "",
          section: "News",},{
        id: 'social-email',
        title: 'email',
        section: 'Socials',
        handler: () => {
          window.open("mailto:%6A%68%70%61%72%6B%38%31%33@%6B%61%69%73%74.%61%63.%6B%72", "_blank");
        },
      },{
        id: 'social-linkedin',
        title: 'LinkedIn',
        section: 'Socials',
        handler: () => {
          window.open("https://www.linkedin.com/in/cabbalett", "_blank");
        },
      },{
        id: 'social-scholar',
        title: 'Google Scholar',
        section: 'Socials',
        handler: () => {
          window.open("https://scholar.google.com/citations?user=nmLxRfsAAAAJ", "_blank");
        },
      },{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
