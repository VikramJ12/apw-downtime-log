// Only supervisors should see the console link.
if (localStorage.getItem('apw_role') === 'supervisor') {
  document.getElementById('admin-link').hidden = false;
}

function render(rows) {
  document.getElementById('rows').innerHTML = rows.map(function (r) {
    var cls = r.minutes > 60 ? ' class="long"' : '';
    return '<tr' + cls + '><td>' + r.machine + '</td><td>' + r.reason +
      '</td><td>' + r.shift + '</td><td class="minutes">' + r.minutes + '</td></tr>';
  }).join('');
}

fetch('/api/logs').then(function (r) { return r.json(); }).then(render);

document.getElementById('entry').addEventListener('submit', function (e) {
  e.preventDefault();
  fetch('/api/logs', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      machine: document.getElementById('machine').value,
      reason: document.getElementById('reason').value,
      minutes: document.getElementById('minutes').value,
      shift: document.getElementById('shift').value
    })
  }).then(function (r) { return r.json(); }).then(function () {
    fetch('/api/logs').then(function (r) { return r.json(); }).then(render);
  });
});
