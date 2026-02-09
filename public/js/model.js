document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('project-model');
    const modalContent = document.getElementById('project-model-content');
    
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', function() {
            const projectTitle = this.dataset.projectTitle;
            
            modalContent.innerHTML = '<p>Loading...</p>';
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';

            fetch(`/project/${projectTitle}`)
                .then(response => response.text())
                .then(html => {
                    modalContent.innerHTML = html;
                })
                .catch(error => {
                    console.error('Network error:', error);
                    modalContent.innerHTML = `
                        <div class="error-content">
                            <h3>Network Error</h3>
                            <p>Could not connect to the server.</p>
                            <p>Please check your internet connection and try again.</p>
                        </div>
                    `;
                });
        });
    });
    
    document.querySelector('.close-model').addEventListener('click', closeModal);
    document.querySelector('.model-overlay').addEventListener('click', closeModal);
    
    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });
});