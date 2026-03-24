export const getProjects = async () => {
  return [
    {
      id: "1",
      title: "Designing Dashboards filtered",
      description: "Dashboard UI project",
      startDate: "2020-01-01",
      endDate: "2021-01-01",
      coverImage: "https://i.pinimg.com/736x/13/3d/68/133d687e69873147395a517963ba1f4a.jpg",
      skills: [
        { id: "1", name: "TypeScript", category: "Language", icon: "typescript" },
        { id: "2", name: "JavaScript", category: "Language", icon: "javascript" },
        { id: "3", name: "React", category: "Frontend", icon: "react" },
        { id: "4", name: "CSS3", category: "Frontend", icon: "css" },
        { id: "5", name: "HTML5", category: "Frontend", icon: "html5" },
        { id: "6", name: "Node.js", category: "Backend", icon: "node" },
        { id: "7", name: "Linux", category: "Devops / Tools", icon: "linux" },
        { id: "8", name: "Docker", category: "Devops / Tools", icon: "docker" },
      ]
    },
    {
      id: "2",
      title: "Designing Dashboards",
      description: "Dashboard UI project",
      startDate: "2020-01-01",
      endDate: "2021-01-01",
      coverImage: "https://i.pinimg.com/736x/13/3d/68/133d687e69873147395a517963ba1f4a.jpg",
      skills: [
        { id: "1", name: "TypeScript", category: "Language", icon: "typescript" },
        { id: "2", name: "JavaScript", category: "Language", icon: "javascript" },
        { id: "3", name: "React", category: "Frontend", icon: "react" },
        { id: "4", name: "CSS3", category: "Frontend", icon: "css" },
        { id: "5", name: "HTML5", category: "Frontend", icon: "html5" },
        { id: "6", name: "Node.js", category: "Backend", icon: "node" },
        { id: "7", name: "Linux", category: "Devops / Tools", icon: "linux" },
        { id: "8", name: "Docker", category: "Devops / Tools", icon: "docker" },
      ]
    },
    {
      id: "3",
      title: "Designing Dashboards",
      description: "Dashboard UI project",
      startDate: "2020-01-01",
      endDate: "2021-01-01",
      coverImage: "https://i.pinimg.com/736x/13/3d/68/133d687e69873147395a517963ba1f4a.jpg",
      skills: [
        { id: "1", name: "TypeScript", category: "Language", icon: "typescript" },
        { id: "2", name: "JavaScript", category: "Language", icon: "javascript" },
        { id: "3", name: "React", category: "Frontend", icon: "react" },
        { id: "4", name: "CSS3", category: "Frontend", icon: "css" },
        { id: "5", name: "HTML5", category: "Frontend", icon: "html5" },
        { id: "6", name: "Node.js", category: "Backend", icon: "node" },
        { id: "7", name: "Linux", category: "Devops / Tools", icon: "linux" },
        { id: "8", name: "Docker", category: "Devops / Tools", icon: "docker" },
      ]
    },
    {
      id: "4",
      title: "Designing Dashboards",
      description: "Dashboard UI project",
      startDate: "2020-01-01",
      endDate: "2021-01-01",
      coverImage: "https://i.pinimg.com/736x/13/3d/68/133d687e69873147395a517963ba1f4a.jpg",
      skills: [
        { id: "1", name: "TypeScript", category: "Language", icon: "typescript" },
        { id: "2", name: "JavaScript", category: "Language", icon: "javascript" },
        { id: "3", name: "React", category: "Frontend", icon: "react" },
        { id: "4", name: "CSS3", category: "Frontend", icon: "css" },
        { id: "5", name: "HTML5", category: "Frontend", icon: "html5" },
        { id: "6", name: "Node.js", category: "Backend", icon: "node" },
        { id: "7", name: "Linux", category: "Devops / Tools", icon: "linux" },
        { id: "8", name: "Docker", category: "Devops / Tools", icon: "docker" },
      ]
    }
  ]
}

export const getProjectById = async (id: string) => {
  return {
    id,
    title: "Designing Dashboards with usability in mind",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas in dapibus justo. Nam elementum eget ex quis sagittis. Fusce posuere rhoncus felis nec ornare. Curabitur placerat tellus in eleifend congue. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Fusce rutrum fringilla augue, vel consectetur tellus bibendum ut. Phasellus purus sapien, malesuada id lobortis sed, sodales et turpis. Proin iaculis pulvinar lectus eu aliquam.Curabitur finibus purus vel ipsum lobortis, eget egestas ligula efficitur. Fusce id molestie nulla, eu scelerisque nibh. Nulla dictum vulputate dictum. Maecenas malesuada mauris sit amet lacus facilisis dapibus. Sed interdum id nunc eu tempor. Praesent vel neque nec mi maximus porttitor. Integer lobortis convallis urna, ullamcorper interdum nisl mollis eget.Donec et iaculis tortor, vel gravida arcu. Morbi vitae eros posuere, dapibus mi sit amet, efficitur quam. Proin venenatis fermentum mollis. Sed a venenatis lorem. Maecenas lobortis euismod augue, eget convallis mi mollis et. Fusce et aliquet ex, eu tincidunt nisl. Quisque lobortis feugiat nibh, dictum dapibus sem blandit in.",
    startDate: "2020-01-01",
    endDate: "2021-01-01",
    skills: [
      { id: "1", name: "TypeScript", category: "Language", icon: "typescript" },
      { id: "2", name: "JavaScript", category: "Language", icon: "javascript" },
      { id: "3", name: "React", category: "Frontend", icon: "react" },
      { id: "4", name: "CSS3", category: "Frontend", icon: "css" },
      { id: "5", name: "HTML5", category: "Frontend", icon: "html5" },
      { id: "6", name: "Node.js", category: "Backend", icon: "node" },
      { id: "7", name: "Linux", category: "Devops / Tools", icon: "linux" },
      { id: "8", name: "Docker", category: "Devops / Tools", icon: "docker" },
    ]
  }
}

export const getProjectImages = async (projectId: string) => {
  return [
    { id: "1", url: "https://i.pinimg.com/736x/13/3d/68/133d687e69873147395a517963ba1f4a.jpg", order: 1 },
    { id: "2", url: "https://www.dzoom.org.es/wp-content/uploads/2017/07/seebensee-2384369.jpg", order: 2 },
    { id: "3", url: "https://dessindigo.com/storage/images/posts/paysage-printanier/dessin-paysage-printanier.webp", order: 3 },
  ]
}