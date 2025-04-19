function toggleDropdown() {
  const options = document.querySelector(".dropdown-opt");
  options.classList.toggle("active");
}

document.querySelectorAll(".dropdown-opt div").forEach((option) => {
  option.addEventListener("click", (e) => {
    const dropdownBtn = document.querySelector(".dropdown-btn");
    dropdownBtn.innerHTML = `${e.target.innerHTML} <i class="ti ti-arrows-exchange"></i>`;
    const options = document.querySelector(".dropdown-opt");
    options.classList.remove("active");
  });
});

document.querySelector('.dropdown-btn').addEventListener('click', toggleDropdown);
