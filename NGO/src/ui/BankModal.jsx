import { useEffect, useState } from 'react';
import './BankModal.css';

export default function BankModal({ isOpen, onClose }) {
    const [copyState, setCopyState] = useState('Copy account number');

    const bankDetails = {
        bankName: 'Jaiz Bank PLC',
        accountType: 'Current Account Corporate',
        accountNumber: '0024022015',
        currency: 'NGN',
        branch: '389 Old Abeokuta Road Oko-Oba, Agege, Lagos State',
    };

    useEffect(() => {
        if (!isOpen) {
            document.body.style.overflow = '';
            return;
        }

        document.body.style.overflow = 'hidden';

        const handleEscape = (event) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        window.addEventListener('keydown', handleEscape);
        return () => {
            window.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = '';
        };
    }, [isOpen, onClose]);

    const copyAccountNumber = async () => {
        try {
            await navigator.clipboard.writeText(bankDetails.accountNumber);
            setCopyState('Copied');
            window.setTimeout(() => setCopyState('Copy account number'), 1600);
        } catch {
            setCopyState('Copy failed');
            window.setTimeout(() => setCopyState('Copy account number'), 1600);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="bank-modal-backdrop" onClick={onClose}>
            <div
                className="bank-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="bank-modal-title"
                onClick={(event) => event.stopPropagation()}
            >
                <button type="button" className="bank-modal-close" onClick={onClose} aria-label="Close modal">
                    ×
                </button>

                <div className="bank-modal-badge">Support details</div>
                <h2 id="bank-modal-title">Bank Information</h2>
                <p className="bank-modal-lead">
                    Use the account details below to support Naphtali Initiative For Autism.
                </p>

                <div className="bank-modal-bank">
                    <span className="bank-modal-label">Bank name</span>
                    <strong>{bankDetails.bankName}</strong>
                </div>

                <div className="bank-modal-grid">
                    <div className="bank-modal-card bank-modal-highlight">
                        <span>Account type</span>
                        <strong>{bankDetails.accountType}</strong>
                    </div>
                    <div className="bank-modal-card">
                        <span>Account number</span>
                        <strong>{bankDetails.accountNumber}</strong>
                        <button type="button" className="bank-modal-copy" onClick={copyAccountNumber}>
                            {copyState}
                        </button>
                    </div>
                    <div className="bank-modal-card">
                        <span>Currency</span>
                        <strong>{bankDetails.currency}</strong>
                    </div>
                    {/* <div className="bank-modal-card bank-modal-wide">
                        <span>Branch</span>
                        <strong>{bankDetails.branch}</strong>
                    </div> */}
                </div>

                <div className="bank-modal-note">
                    <p>
                        Every contribution helps fund awareness, early intervention, and family support programs.
                    </p>
                </div>
            </div>
        </div>
    );
}
