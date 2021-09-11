const descriptionField = document.getElementById('issueDescription');
const severityField = document.getElementById('issueSeverity');
const assignedField = document.getElementById('issueAssigned');
const submitBtn = document.getElementById('submit-btn');
const issueList = document.getElementById('issueList');


submitBtn.addEventListener('click', (e) => {
    const getInputValue = id => document.getElementById(id).value;
    const descriptionInput = descriptionField.value;
    const severityInput = severityField.value;
    const assignedInput = assignedField.value;
    const id = parseInt(Math.random() * 1000000000) + '';
    const status = 'Open';
    const issue = { id, descriptionInput, severityInput, assignedInput, status };

    descriptionField.value = '';
    assignedField.value = '';

    let issues = [];
    if (localStorage.getItem('issues')) {
        issues = JSON.parse(localStorage.getItem('issues'));
    }
    issues.push(issue);
    localStorage.setItem('issues', JSON.stringify(issues));

    // document.getElementById('issueFormInput').reset();
    displayIssue();
    e.preventDefault();
})

const displayIssue = () => {
    const issues = JSON.parse(localStorage.getItem('issues'));
    if (issues === null) {
        console.log('No Issue Found');
        return;
    }
    issueList.innerHTML = '';
    issues.forEach(issue => {
        const newDiv = document.createElement('div')
        newDiv.innerHTML = `
        <div class="issue-card">
        <h6 class="text-muted">Issue ID: ${issue.id}</h6>
        <p><span class="label status"> ${issue.status}</span></p>
        <h5>${issue.descriptionInput}</h5>
        <p class=""><i class="fas fa-hourglass-start"></i> ${issue.severityInput}</p>
        <p class=""><i class="fas fa-user"></i> ${issue.assignedInput}</p>
        <button href="#" onclick="issueClosed(${issue.id})" class="btn close-btn">Close</button>
        <button href="#" onclick="issueDelete(${issue.id})" class="btn del-btn">Delete</button>
        </div>`
        issueList.appendChild(newDiv);
    });
}


const issueClosed = id => {
    const issues = JSON.parse(localStorage.getItem('issues'));
    const updateIssue = issues.find(issue => parseInt(issue.id) === id);
    updateIssue.status = 'Closed';
    localStorage.setItem('issues', JSON.stringify(issues));

    displayIssue();
}

const issueDelete = id => {
    const issues = JSON.parse(localStorage.getItem('issues'));
    const remainingIssue = issues.filter(issue => issue.id != id);
    localStorage.setItem('issues', JSON.stringify(remainingIssue));
    displayIssue()
}