import nodemailer from "nodemailer";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });



   
const htmlMessage = `
<div>
  <div>

    <!-- Header -->
    <h2>New Form Submission</h2>

    <!-- Contact Section -->
    ${data.contact?.name || data.contact?.email ? `
      <h4>Contact</h4>
      ${data.contact?.name ? `<p><strong>Name:</strong> ${data.contact.name}</p>` : ""}
      ${data.contact?.email ? `<p><strong>Email:</strong> ${data.contact.email}</p>` : ""}
      ${data.contact?.additionalInfo ? `<p><strong>Note:</strong> ${data.contact.additionalInfo}</p>` : ""}
    ` : ""}

    <!-- Build Something Section -->
    ${data.buildSomething?.projectName || data.buildSomething?.description ? `
      <h4>Build Something</h4>
      ${data.buildSomething?.projectName ? `<p><strong>Project:</strong> ${data.buildSomething.projectName}</p>` : ""}
      ${data.buildSomething?.description ? `<p><strong>Description:</strong> ${data.buildSomething.description}</p>` : ""}
      ${data.buildSomething?.techstack ? `<p><strong>Tech:</strong> ${data.buildSomething.techstack}</p>` : ""}
      ${data.buildSomething?.budget ? `<p><strong>Budget:</strong> ${data.buildSomething.budget}</p>` : ""}
      ${data.buildSomething?.timeline ? `<p><strong>Timeline:</strong> ${data.buildSomething.timeline}</p>` : ""}
      ${data.buildSomething?.needs?.length ? `<p><strong>Needs:</strong> ${data.buildSomething.needs.join(", ")}</p>` : ""}
    ` : ""}

    <!-- Collaborate Section -->
    ${data.collaborate?.repoName || data.collaborate?.pitch ? `
      <h4>Collaborate</h4>
      ${data.collaborate?.repoName ? `<p><strong>Repo:</strong> ${data.collaborate.repoName}</p>` : ""}
      ${data.collaborate?.pitch ? `<p><strong>Pitch:</strong> ${data.collaborate.pitch}</p>` : ""}
      ${data.collaborate?.projectlink ? `<p><strong>Link:</strong> ${data.collaborate.projectlink}</p>` : ""}
      ${data.collaborate?.role ? `<p><strong>Role:</strong> ${data.collaborate.role}</p>` : ""}
      ${data.collaborate?.techStack?.length ? `<p><strong>Tech:</strong> ${data.collaborate.techStack.join(", ")}</p>` : ""}
    ` : ""}

    <!-- Hire Me Section -->
    ${data.hireMe?.company || data.hireMe?.techRole ? `
      <h4>Hire Me</h4>
      ${data.hireMe?.company ? `<p><strong>Company:</strong> ${data.hireMe.company}</p>` : ""}
      ${data.hireMe?.techRole ? `<p><strong>Role:</strong> ${data.hireMe.techRole}</p>` : ""}
      ${data.hireMe?.jobposting ? `<p><strong>Job Link:</strong> ${data.hireMe.jobposting}</p>` : ""}
      ${data.hireMe?.roleType ? `<p><strong>Type:</strong> ${data.hireMe.roleType}</p>` : ""}
      ${data.hireMe?.jobLocation ? `<p><strong>Location:</strong> ${data.hireMe.jobLocation}</p>` : ""}
    ` : ""}

    <!-- Footer -->
    <p>Sent from your portfolio</p>

  </div>
</div>
`;
    await transporter.sendMail({
      from: `"Form" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `New Form Submission`, 
      html: htmlMessage,            
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}