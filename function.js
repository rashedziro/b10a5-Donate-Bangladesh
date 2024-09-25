let balance = 5500;
const donations = {
  noakhali: 0,
  feni: 0,
  quota: 0
};

function updateBalance() {
  document.getElementById('balance').innerText = balance;
}

function donate(campaign) {
  const amountInput = document.getElementById(`amount-${campaign}`);
  const amount = parseInt(amountInput.value);

  if (isNaN(amount) || amount <= 0) {
    alert("Please enter a valid positive number.");
    return;
  }

  donations[campaign] += amount;
  balance -= amount;

  document.getElementById(`donation-${campaign}`).innerText = donations[campaign];
  updateBalance();

  showModal(campaign, amount);

  amountInput.value = '';
}

function showModal(campaign, amount) {
  document.getElementById('modal-campaign').innerText = campaign;
  document.getElementById('modal-amount').innerText = amount;
  document.getElementById('success-modal').classList.remove('hidden');
}

function closeModal() {
  document.getElementById('success-modal').classList.add('hidden');
}

document.getElementById('donation-btn').addEventListener('click', () => {
  document.getElementById('donation-section').classList.remove('hidden');
  document.getElementById('history-section').classList.add('hidden');
  updateActiveButton('donation-btn');
});

document.getElementById('history-btn').addEventListener('click', () => {
  document.getElementById('donation-section').classList.add('hidden');
  document.getElementById('history-section').classList.remove('hidden');
  updateActiveButton('history-btn');
  showHistory();
});

function updateActiveButton(activeId) {
  const buttons = ['donation-btn', 'history-btn'];
  buttons.forEach((id) => {
    const btn = document.getElementById(id);
    if (id === activeId) {
      btn.classList.add('btn-active');
      btn.classList.remove('btn-outline');
    } else {
      btn.classList.add('btn-outline');
      btn.classList.remove('btn-active');
    }
  });
}

function showHistory() {
  const historyList = document.getElementById('history-list');
  historyList.innerHTML = '';

  for (const campaign in donations) {
    if (donations[campaign] > 0) {
      const li = document.createElement('li');
      li.innerText = `Donated ${donations[campaign]} BDT to ${campaign}`;
      historyList.appendChild(li);
    }
  }
}
