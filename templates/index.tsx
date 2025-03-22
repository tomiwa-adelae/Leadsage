import { formatMoneyInput } from "@/lib/utils";

export const generateUserEmail = (booking: any) => `
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

export const generateRenterEmail = (booking: any) => `
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
