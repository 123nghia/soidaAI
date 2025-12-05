<!-- PHẦN 2 NÚT NGANG -->
<style>
.floating-contact {
  position: fixed;
  bottom: 90px;
  right: 50px;
  z-index: 999;
}

@media (max-width: 600px) {
  .floating-contact {
        right: 15px !important;
    }
}
.main-contact-btn {
  width: 60px;
  height: 60px;
  background: #0084ff;
  color: white;
  font-size: 26px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  animation: pulse 2s infinite;
  position: relative;
  text-decoration: none;
}

/* Hover scale effect */
.main-contact-btn:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 18px rgba(0, 132, 255, 0.6);
}

/* Pulse animation */
@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
}

/* Custom tooltip */
.main-contact-btn::after {
  content: attr(data-tooltip);
  position: absolute;
  bottom: 70px;
  left: 50%;
  transform: translateX(-50%);
  background: #333;
  color: #fff;
  padding: 6px 10px;
  border-radius: 4px;
  white-space: nowrap;
  font-size: 13px;
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
  z-index: 1000;
}

/* Show tooltip on hover */
.main-contact-btn:hover::after {
  opacity: 1;
}
</style>


<div class="floating-contact">
  <a 
    href="https://m.me/106007668343244?ref=mess" 
    target="_blank" 
    class="main-contact-btn" 
    data-tooltip="Tư vấn qua Messenger"
    aria-label="Tư vấn qua Messenger"
  >
    <i class="fab fa-facebook-messenger"></i>
  </a>
</div>
<div class="button-row">
    <button class="btn-main" onclick="downloadFilePdf()">
        📄 Lưu file PDF
    </button>
    <button onclick="openRecomendProduct()" class="btn-secondary">
        Gợi ý chăm sóc từ chuyên gia
    </button>
</div>

<style>
    .button-row {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 16px;
        margin-top: 30px;
        margin-bottom: 30px;
        flex-wrap: wrap;
    }

    .btn-main {
        background-color: #007bff;
        color: white;
        border: none;
        padding: 12px 24px;
        font-size: 16px;
        border-radius: 6px;
        cursor: pointer;
        transition: background-color 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease;
    }

    .btn-main:hover {
        background-color: #0056b3;
        transform: scale(1.05);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    }

    .btn-secondary {
        background: none;
        border: 2px solid #007bff;
        color: #007bff;
        font-weight: bold;
        padding: 10px 20px;
        font-size: 15px;
        border-radius: 6px;
        cursor: pointer;
        transition: background-color 0.3s ease, color 0.3s ease, transform 0.2s ease;
    }

    .btn-secondary:hover {
        background-color: #007bff;
        color: #fff;
        transform: scale(1.05);
    }
</style>


</div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"></script>

<script>
    function waitForImagesToLoad(container) {
        const images = container.querySelectorAll('img');
        const promises = Array.from(images).map(img => {
            if (img.complete) return Promise.resolve();
            return new Promise(resolve => {
                img.onload = img.onerror = resolve;
            });
        });
        return Promise.all(promises);
    }


    function downloadFilePdf() {
        const element = document.body;
        waitForImagesToLoad(element).then(() => {
            const opt = {
                margin: 0.5,
                filename: 'ket_qua_soi_da.pdf',
                image: {
                    type: 'jpeg',
                    quality: 0.98
                },
                html2canvas: {
                    scale: 2,
                    useCORS: true,
                    allowTaint: true
                },
                jsPDF: {
                    unit: 'in',
                    format: 'a4',
                    orientation: 'portrait'
                }
            };

            html2pdf().set(opt).from(element).save();
        });
    }
</script>
