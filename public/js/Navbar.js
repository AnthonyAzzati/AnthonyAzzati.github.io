"use strict"

class Navbar {
    constructor() {
        this.menuBtn = document.getElementById('menuBtn');
        this.mobileMenu = document.getElementById('mobileMenu');
    }

    toggleMenu() {
        this.menuBtn.addEventListener('click', () => {
            this.mobileMenu.classList.toggle('active');
        })
    }
}