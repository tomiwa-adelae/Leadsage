import { formatDate, formatMoneyInput } from "@/lib/utils";

export const generateRenterEmail = (booking: any) => `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Booking Confirmation</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
    <table width="100%" border="0" cellspacing="0" cellpadding="0">
        <tr>
            <td align="center" style="padding: 20px;">
                <table width="600" bgcolor="#ffffff" style="border-radius: 8px; overflow: hidden; box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);">
                    <tr>
                        <td align="center" style="background-color: #4CAF50; padding: 20px;">
                            <h1 style="color: #ffffff; margin: 0;">Booking Confirmed! 🎉</h1>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 20px; text-align: left;">
                            <p>Dear <strong>${booking.user.firstName} ${
	booking.user.lastName
}</strong>,</p>
                            <p>Thank you for booking <strong>{{ listing_name }}</strong> at <strong>${
								booking.listing.address
							}, ${booking.listing.city},${
	booking.listing.state
}</strong>.</p>
                            <p>Your booking has been successfully confirmed, and we’re excited to have you! Here are the details:</p>

                            <table style="width: 100%; margin-top: 10px; border-collapse: collapse;">
                                <tr>
                                    <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Booking ID:</strong></td>
                                    <td style="padding: 8px; border-bottom: 1px solid #ddd;">${
										booking._id
									}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Rent price:</strong></td>
                                    <td style="padding: 8px; border-bottom: 1px solid #ddd;">${formatMoneyInput(
										booking.listing.rentPrice
									)}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Availability Date:</strong></td>
                                    <td style="padding: 8px; border-bottom: 1px solid #ddd;">${
										booking.listing.availabilityDate
									}</td>
                                </tr>
                            </table>

                            <p>If you have any questions, feel free to reach out to us.</p>

                            <p>Best Regards, <br><strong>Leadsage Team</strong></p>

                            <div style="text-align: center; margin-top: 20px;">
                                <a href="${process.env.WEBSITE_URL}/bookings/${
	booking._id
}" style="background-color: #4CAF50; color: #ffffff; padding: 10px 20px; text-decoration: none; border-radius: 4px;">View Booking</a>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td align="center" style="background-color: #f4f4f4; padding: 10px; font-size: 12px; color: #666;">
                            &copy; 2025 Leadsage. All rights reserved.
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
`;

export const generateAdminEmail = (booking: any) => `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>New Booking Alert - Leadsage</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
    <table width="100%" border="0" cellspacing="0" cellpadding="0">
        <tr>
            <td align="center" style="padding: 20px;">
                <table width="600" bgcolor="#ffffff" style="border-radius: 8px; overflow: hidden; box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);">
                    <tr>
                        <td align="center" style="background-color: #FF5733; padding: 20px;">
                            <h1 style="color: #ffffff; margin: 0;">New Booking Alert! 📢</h1>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 20px; text-align: left;">
                            <p>Dear Admin,</p>
                            <p>A new booking has been made on Leadsage. Below are the details:</p>

                            <h3>📌 Booking Details:</h3>
                            <table style="width: 100%; margin-top: 10px; border-collapse: collapse;">
                                <tr>
                                    <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Booking ID:</strong></td>
                                    <td style="padding: 8px; border-bottom: 1px solid #ddd;">${booking._id}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Property Name:</strong></td>
                                    <td style="padding: 8px; border-bottom: 1px solid #ddd;">${booking.listing.name}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Location:</strong></td>
                                    <td style="padding: 8px; border-bottom: 1px solid #ddd;">${booking.listing.address}, ${booking.listing.city}, ${booking.listing.state}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Availability Date:</strong></td>
                                    <td style="padding: 8px; border-bottom: 1px solid #ddd;">${booking.listing.availabilityDate}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Rent price:</strong></td>
                                    <td style="padding: 8px; border-bottom: 1px solid #ddd;">${booking.listing.rentPrice}</td>
                                </tr>
                            </table>

                            <h3>👤 Renter Details:</h3>
                            <table style="width: 100%; margin-top: 10px; border-collapse: collapse;">
                                <tr>
                                    <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Name:</strong></td>
                                    <td style="padding: 8px; border-bottom: 1px solid #ddd;">${booking.user.firstName} ${booking.user.lastName}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Email:</strong></td>
                                    <td style="padding: 8px; border-bottom: 1px solid #ddd;">${booking.user.email}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Phone Number:</strong></td>
                                    <td style="padding: 8px; border-bottom: 1px solid #ddd;">${booking.user.phoneNumber}</td>
                                </tr>
                            </table>

                            <h3>🏠 Host Details:</h3>
                            <table style="width: 100%; margin-top: 10px; border-collapse: collapse;">
                                <tr>
                                    <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Host Name:</strong></td>
                                    <td style="padding: 8px; border-bottom: 1px solid #ddd;">${booking.listing.user.firstName} ${booking.listing.user.lastName}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Email:</strong></td>
                                    <td style="padding: 8px; border-bottom: 1px solid #ddd;">${booking.listing.user.email}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Phone Number:</strong></td>
                                    <td style="padding: 8px; border-bottom: 1px solid #ddd;">${booking.listing.user.phoneNumber}</td>
                                </tr>
                            </table>

                            <p>Admin action may be required for further verification or support.</p>

                            <p>Best Regards, <br><strong>Leadsage System</strong></p>

                            <div style="text-align: center; margin-top: 20px;">
                                <a href="${process.env.WEBSITE_URL}/bookings/${booking._id}" style="background-color: #FF5733; color: #ffffff; padding: 10px 20px; text-decoration: none; border-radius: 4px;">View Booking</a>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td align="center" style="background-color: #f4f4f4; padding: 10px; font-size: 12px; color: #666;">
                            &copy; 2025 Leadsage. All rights reserved.
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
`;

export const generateLandlordEmail = (booking: any) => `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Your Property Has Been Booked!</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
    <table width="100%" border="0" cellspacing="0" cellpadding="0">
        <tr>
            <td align="center" style="padding: 20px;">
                <table width="600" bgcolor="#ffffff" style="border-radius: 8px; overflow: hidden; box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);">
                    <tr>
                        <td align="center" style="background-color: #007BFF; padding: 20px;">
                            <h1 style="color: #ffffff; margin: 0;">Great News! 🎉</h1>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 20px; text-align: left;">
                            <p>Dear <strong>${
								booking.listing.user.firstName
							}</strong>,</p>
                            <p>We’re excited to inform you that your listing <strong>${
								booking.listing.name
							}</strong> at <strong>${booking.listing.address},${
	booking.listing.city
},${booking.listing.state}</strong> has been successfully booked!</p>
                            <p>Here are the booking details:</p>

                            <table style="width: 100%; margin-top: 10px; border-collapse: collapse;">
                                <tr>
                                    <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Booking ID:</strong></td>
                                    <td style="padding: 8px; border-bottom: 1px solid #ddd;">${
										booking._id
									}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Guest Name:</strong></td>
                                    <td style="padding: 8px; border-bottom: 1px solid #ddd;">${
										booking.user.firstName
									} ${booking.user.lastName}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Guest Contact:</strong></td>
                                    <td style="padding: 8px; border-bottom: 1px solid #ddd;">${
										booking.user.email
									}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Rent price:</strong></td>
                                    <td style="padding: 8px; border-bottom: 1px solid #ddd;">${formatMoneyInput(
										booking.listing.rentPrice
									)}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Check-in Date:</strong></td>
                                    <td style="padding: 8px; border-bottom: 1px solid #ddd;">${
										booking.listing.availabilityDate
									}</td>
                                </tr>
                            </table>

                            <p>Please ensure that everything is ready for your guest’s arrival. You can manage this booking in your dashboard.</p>

                            <p>Thank you for being a valued host on Leadsage!</p>

                            <p>Best Regards, <br><strong>Leadsage Team</strong></p>

                            <div style="text-align: center; margin-top: 20px;">
                                <a href="${process.env.WEBSITE_URL}/bookings/${
	booking._id
}" style="background-color: #007BFF; color: #ffffff; padding: 10px 20px; text-decoration: none; border-radius: 4px;">Manage Booking</a>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td align="center" style="background-color: #f4f4f4; padding: 10px; font-size: 12px; color: #666;">
                            &copy; 2025 Leadsage. All rights reserved.
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
`;

export const generateRenterCancellationEmail = (booking: any) => {
	return `<!DOCTYPE html>
<html>
<head>
<head>
    <meta charset="UTF-8">
    <title>Your Booking Has Been Cancelled!</title>
</head>
    <style>
        body { font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; }
        .container { background: #ffffff; padding: 20px; border-radius: 8px; max-width: 600px; margin: auto; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); }
        h2 { color: #333; }
        p { color: #555; line-height: 1.6; }
        .details { background: #f8f8f8; padding: 15px; border-radius: 5px; margin-top: 15px; }
        .footer { text-align: center; font-size: 12px; color: #777; margin-top: 20px; }
        .btn { display: inline-block; padding: 10px 15px; background: #007bff; color: #fff; text-decoration: none; border-radius: 5px; margin-top: 10px; }
    </style>
</head>
<body>
    <div class="container">
        <h2>Your Booking Has Been Canceled</h2>
        <p>Hi <strong>${booking.user.firstName} ${
		booking.user.lastName
	}</strong>,</p>
        <p>Your booking for <strong>${
			booking.listing.name
		}</strong> at <strong>${booking.listing.address}, ${
		booking.listing.city
	}, ${booking.listing.state}</strong> has been successfully canceled.</p>
        
        <div class="details">
            <p><strong>Booking Details:</strong></p>
            <p>🏡 <strong>Listing:</strong>${booking.listing.name}</p>
            <p>📅 <strong>Booking-in Date:</strong> ${formatDate(
				booking.createdAt
			)}</p>
            <p>🛑 <strong>Cancellation Date:</strong> ${formatDate(
				booking.updatedAt
			)}</p>
        </div>

        <p>If you need assistance, please contact our support team.</p>

        <a href="${
			process.env.WEBSITE_URL
		}/contact" class="btn">Contact Support</a>

        <p class="footer">Thank you for choosing Leadsage! We look forward to helping you find another great space.</p>
    </div>
</body>
</html>`;
};

export const generateLandlordCancellationEmail = (booking: any) => {
	return `<!DOCTYPE html>
<html>
<head>
<head>
    <meta charset="UTF-8">
    <title>Your Booking Has Been Cancelled!</title>
</head>
    <style>
        body { font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; }
        .container { background: #ffffff; padding: 20px; border-radius: 8px; max-width: 600px; margin: auto; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); }
        h2 { color: #333; }
        p { color: #555; line-height: 1.6; }
        .details { background: #f8f8f8; padding: 15px; border-radius: 5px; margin-top: 15px; }
        .footer { text-align: center; font-size: 12px; color: #777; margin-top: 20px; }
        .btn { display: inline-block; padding: 10px 15px; background: #007bff; color: #fff; text-decoration: none; border-radius: 5px; margin-top: 10px; }
    </style>
</head>
<body>
    <div class="container">
        <h2>Booking Cancellation Notice</h2>
        <p>Hi <strong>${booking.listing.user.firstName} ${
		booking.listing.user.lastName
	}</strong>,</p>
        <p>The renter <strong>${booking.user.firstName} ${
		booking.user.lastName
	}</strong> has canceled their booking for your property, <strong>${
		booking.listing.name
	}</strong>.</p>
        
        <div class="details">
            <p><strong>Booking Details:</strong></p>
            <p>🏡 <strong>Listing:</strong> ${booking.listing.name}</p>
            <p>👤 <strong>Renter:</strong> ${booking.user.firstName} ${
		booking.user.lastName
	}</p>
            <p>📅 <strong>Original Booking-in Date:</strong> ${formatDate(
				booking.createdAt
			)}</p>
            <p>🛑 <strong>Cancellation Date:</strong> ${formatDate(
				booking.updatedAt
			)}</p>
        </div>

        <p>You can review this cancellation in your dashboard.</p>

        <a href="${process.env.WEBSITE_URL}/bookings/${
		booking._id
	}" class="btn">View Dashboard</a>

        <p class="footer">Thank you for listing with Leadsage! We look forward to connecting you with new renters.</p>
    </div>
</body>
</html>`;
};

export const generateAdminCancellationEmail = (booking: any) => {
	return `<!DOCTYPE html>
<html>
<head>
<head>
    <meta charset="UTF-8">
    <title>A Booking Has Been Cancelled!</title>
</head>
    <style>
        body { font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; }
        .container { background: #ffffff; padding: 20px; border-radius: 8px; max-width: 600px; margin: auto; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); }
        h2 { color: #333; }
        p { color: #555; line-height: 1.6; }
        .details { background: #f8f8f8; padding: 15px; border-radius: 5px; margin-top: 15px; }
        .footer { text-align: center; font-size: 12px; color: #777; margin-top: 20px; }
    </style>
</head>
<body>
    <div class="container">
        <h2>Booking Cancellation Alert</h2>
        <p>Hello Admin,</p>
        <p>A renter has canceled their booking. Below are the details:</p>
        
        <div class="details">
            <p><strong>Booking Information:</strong></p>
            <p>🏡 <strong>Listing:</strong>${booking.listing.name}</p>
            <p>👤 <strong>Landlord:</strong> ${
				booking.listing.user.firstName
			} ${booking.listing.user.lastName} (${
		booking.listing.user.email
	})</p>
            <p>👤 <strong>Renter:</strong> ${booking.user.firstName} ${
		booking.user.lastName
	} (${booking.user.email})</p>
            <p>📅 <strong>Original Booking-in Date:</strong> ${formatDate(
				booking.createdAt
			)}</p>
            <p>🛑 <strong>Cancellation Date:</strong> ${formatDate(
				booking.updatedAt
			)}</p>
        </div>

        <p>Please review this cancellation and take any necessary action.</p>

        <p class="footer">Leadsage System Notification</p>
    </div>
</body>
</html>`;
};

export const generateRenterApprovedEmail = (booking: any) => {
	return `
    <!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>🎉 Your Booking Has Been Approved!</title>
    <style>
        body { font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; }
        .container { background: #ffffff; padding: 20px; border-radius: 8px; max-width: 600px; margin: auto; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); }
        h2 { color: #28a745; }
        p { color: #555; line-height: 1.6; }
        .details { background: #f8f8f8; padding: 15px; border-radius: 5px; margin-top: 15px; }
        .footer { text-align: center; font-size: 12px; color: #777; margin-top: 20px; }
        .btn { display: inline-block; padding: 10px 15px; background: #007bff; color: #fff; text-decoration: none; border-radius: 5px; margin-top: 10px; }
    </style>
</head>
<body>
    <div class="container">
        <h2>🎉 Your Booking Has Been Approved!</h2>
        <p>Dear <strong>${booking.user.firstName} ${
		booking.user.lastName
	}</strong>,</p>
        <p>Great news! Your booking request for <strong>${
			booking.listing.name
		}</strong> has been approved by the landlord, <strong>${
		booking.listing.user.firstName
	} ${booking.listing.user.lastName}</strong>.</p>
        
        <div class="details">
            <p><strong>Booking Details:</strong></p>
            <p>📍 <strong>Property:</strong> ${booking.listing.name}</p>
            <p>📅 <strong>Original Booking-in Date:</strong> ${formatDate(
				booking.createdAt
			)}</p>
            <p>💰 <strong>Total Amount:</strong> ${formatMoneyInput(
				booking.listing.rentPrice
			)}</p>
             <p>✅ <strong>Approval Date:</strong> ${formatDate(
					booking.updatedAt
				)}</p>
        </div>

        <p>You can view your booking details below.</p>

        <a href="${process.env.WEBSITE_URL}/bookings/${
		booking._id
	}" class="btn">View Booking</a>

        <p class="footer">Thank you for choosing Leadsage!</p>
    </div>
</body>
</html>`;
};

export const generateRenterRejectedEmail = (booking: any) => {
	return `
    <!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>❌ Your Booking Has Been Rejected!</title>
    <style>
        body { font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; }
        .container { background: #ffffff; padding: 20px; border-radius: 8px; max-width: 600px; margin: auto; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); }
        h2 { color: #28a745; }
        p { color: #555; line-height: 1.6; }
        .details { background: #f8f8f8; padding: 15px; border-radius: 5px; margin-top: 15px; }
        .footer { text-align: center; font-size: 12px; color: #777; margin-top: 20px; }
        .btn { display: inline-block; padding: 10px 15px; background: #007bff; color: #fff; text-decoration: none; border-radius: 5px; margin-top: 10px; }
    </style>
</head>
<body>
    <div class="container">
        <h2>❌ Your Booking Has Been Rejected!</h2>
        <p>Dear <strong>${booking.user.firstName} ${
		booking.user.lastName
	}</strong>,</p>
        <p>Sad news! Your booking request for <strong>${
			booking.listing.name
		}</strong> has been rejected by the landlord, <strong>${
		booking.listing.user.firstName
	} ${booking.listing.user.lastName}</strong>.</p>
        
        <div class="details">
            <p><strong>Booking Details:</strong></p>
            <p>📍 <strong>Property:</strong> ${booking.listing.name}</p>
            <p>📅 <strong>Original Booking-in Date:</strong> ${formatDate(
				booking.createdAt
			)}</p>
            <p>💰 <strong>Total Amount:</strong> ${formatMoneyInput(
				booking.listing.rentPrice
			)}</p>
            <p>❌ <strong>Rejection Date:</strong> ${formatDate(
				booking.updatedAt
			)}</p>
        </div>

        <p>You can view your booking details below.</p>

        <a href="${process.env.WEBSITE_URL}/bookings/${
		booking._id
	}" class="btn">View Booking</a>

        <p class="footer">Thank you for choosing Leadsage!</p>
    </div>
</body>
</html>`;
};

export const generateLandlordApprovedEmail = (booking: any) => {
	return `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>✅ You Approved a Booking</title>
</head>
<body>
    <div class="container">
        <h2>✅ You Approved a Booking</h2>
        <p>Dear <strong>${booking.listing.user.firstName} ${
		booking.listing.user.lastName
	}</strong>,</p>
        <p>You have successfully approved a booking for your property, <strong>${
			booking.listing.name
		}</strong>.</p>
        
        <div class="details">
            <p><strong>Booking Details:</strong></p>
            <p>📍 <strong>Property:</strong> ${booking.listing.name}</p>
            <p>👤 <strong>Renter:</strong> ${booking.user.firstName} ${
		booking.user.lastName
	}</p>
            <p>📅 <strong>Original Booking-in Date:</strong> ${formatDate(
				booking.createdAt
			)}</p>
              <p>✅ <strong>Approval Date:</strong> ${formatDate(
					booking.updatedAt
				)}</p>
        </div>

        <p>You can manage your property bookings via your dashboard.</p>

        <a href="${process.env.WEBSITE_URL}/bookings/${
		booking._id
	}" class="btn">Manage Bookings</a>

        <p class="footer">Thank you for listing with Leadsage!</p>
    </div>
</body>
</html>`;
};

export const generateLandlordRejectedEmail = (booking: any) => {
	return `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>❌ You Rejected a Booking</title>
</head>
<body>
    <div class="container">
        <h2>❌ You Rejected a Booking</h2>
        <p>Dear <strong>${booking.listing.user.firstName} ${
		booking.listing.user.lastName
	}</strong>,</p>
        <p>You have successfully rejected a booking for your property, <strong>${
			booking.listing.name
		}</strong>.</p>
        
        <div class="details">
            <p><strong>Booking Details:</strong></p>
            <p>📍 <strong>Property:</strong> ${booking.listing.name}</p>
            <p>👤 <strong>Renter:</strong> ${booking.user.firstName} ${
		booking.user.lastName
	}</p>
            <p>📅 <strong>Original Booking-in Date:</strong> ${formatDate(
				booking.createdAt
			)}</p>
            <p>❌ <strong>Rejection Date:</strong> ${formatDate(
				booking.updatedAt
			)}</p>
        </div>

        <p>You can manage your property bookings via your dashboard.</p>

        <a href="${process.env.WEBSITE_URL}/bookings/${
		booking._id
	}" class="btn">Manage Bookings</a>

        <p class="footer">Thank you for listing with Leadsage!</p>
    </div>
</body>
</html>`;
};

export const generateAdminApprovedEmail = (booking: any) => {
	return `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>🔔 Booking Approved Notification</title>
</head>
<body>
    <div class="container">
        <h2>🔔 A Booking Has Been Approved</h2>
        <p>Hello Admin,</p>
        <p>The landlord, <strong>${booking.listing.user.firstName} ${
		booking.listing.user.lastName
	}</strong>, has approved a booking for <strong>${
		booking.listing.name
	}</strong>.</p>
        
        <div class="details">
            <p><strong>Booking Details:</strong></p>
            <p>🏡 <strong>Property:</strong> ${booking.listing.name}</p>
            <p>👤 <strong>Renter:</strong> ${booking.user.firstName} ${
		booking.user.lastName
	} (${booking.user.email})</p>
            <p>📅 <strong>Original Booking-in Date:</strong> ${formatDate(
				booking.createdAt
			)}</p>
              <p>✅ <strong>Approval Date:</strong> ${formatDate(
					booking.updatedAt
				)}</p>
        </div>

        <p>Please review this booking if necessary.</p>

        <a href="${process.env.WEBSITE_URL}/bookings/${
		booking._id
	}" class="btn">View Booking</a>

        <p class="footer">Leadsage System Notification</p>
    </div>
</body>
</html>`;
};

export const generateAdminRejectedEmail = (booking: any) => {
	return `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>🔔 Booking Rejected Notification</title>
</head>
<body>
    <div class="container">
        <h2>🔔 A Booking Has Been Rejected</h2>
        <p>Hello Admin,</p>
        <p>The landlord, <strong>${booking.listing.user.firstName} ${
		booking.listing.user.lastName
	}</strong>, has rejected a booking for <strong>${
		booking.listing.name
	}</strong>.</p>
        
        <div class="details">
            <p><strong>Booking Details:</strong></p>
            <p>🏡 <strong>Property:</strong> ${booking.listing.name}</p>
            <p>👤 <strong>Renter:</strong> ${booking.user.firstName} ${
		booking.user.lastName
	} (${booking.user.email})</p>
            <p>📅 <strong>Original Booking-in Date:</strong> ${formatDate(
				booking.createdAt
			)}</p>
            <p>❌ <strong>Rejection Date:</strong> ${formatDate(
				booking.updatedAt
			)}</p>
        </div>

        <p>Please review this booking if necessary.</p>

        <a href="${process.env.WEBSITE_URL}/bookings/${
		booking._id
	}" class="btn">View Booking</a>

        <p class="footer">Leadsage System Notification</p>
    </div>
</body>
</html>`;
};
