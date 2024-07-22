document.addEventListener('DOMContentLoaded', function () {
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const navList = document.querySelector('.nav-list');

    hamburgerMenu.addEventListener('click', function () {
        navList.classList.toggle('show');
    });

    const getStartedBtn = document.getElementById('getStartedBtn');
    const dummySection = document.getElementById('dummySection');

    getStartedBtn.addEventListener('click', function () {
        // Toggle the visibility of the dummy section
        dummySection.style.display = dummySection.style.display === 'none' ? 'block' : 'none';
    });

    document.addEventListener('click', function (event) {
        if (!dummySection.contains(event.target) && event.target !== getStartedBtn) {
            dummySection.style.display = 'none';
        }
        if (!navList.contains(event.target) && event.target !== hamburgerMenu) {
            navList.classList.remove('show'); // Hide the navigation menu when clicking outside of it
        }
    });

    
});


let height; // Declare height as a global variable

function calculateBMI() {
    const weight = parseFloat(document.getElementById('weight').value);
    const age= parseFloat(document.getElementById('age').value);
    const height = parseFloat(document.getElementById('height').value);
    const genderElements = document.getElementsByName("gender");
    let gender;

    for (const element of genderElements) {
        if (element.checked) {
            gender = element.value;
            break;
        }
    }

    if (isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0 || isNaN(age)) {
        alert('Please enter valid values for weight height and age.');
        return;
    }

    // Calculate BMI
    const bmi = weight / ((height / 100) * (height / 100));

    // Display the result
    const resultElement = document.getElementById('result');
    resultElement.innerHTML = `<p>Your BMI is: ${bmi.toFixed(2)}</p>
    <p>Click Report for Detailed Report</p>
    <a href="report.html">Report</a>`;

    localStorage.setItem('height', height);
    localStorage.setItem('weight', weight);
    localStorage.setItem('age', age);
    localStorage.setItem('gender', gender);
    localStorage.setItem('bmi', bmi);


    
}

//Form Sumission Section

const scriptURL = 'https://script.google.com/macros/s/AKfycbxqVCCfpY5KGOSbRgt7fAxzGk7m_VqJ5iX4i9uKf-oDBy8ryYlNIFNkBiVSNEAwM4A1/exec'
			const form = document.forms['Patients-data']
		  
			form.addEventListener('submit', e => {
			  e.preventDefault()
			  fetch(scriptURL, { method: 'POST', body: new FormData(form)})
				.then(response => alert("Thank you! your form is submitted successfully." ))
				.then(() => {  window.location.reload(); })
				.catch(error => console.error('Error!', error.message))
			})