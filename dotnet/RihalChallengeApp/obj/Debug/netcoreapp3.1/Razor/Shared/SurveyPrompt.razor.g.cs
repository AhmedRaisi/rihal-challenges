#pragma checksum "/mnt/c/Users/ahmed/Projects/rihal-challenges/dotnet/RihalChallengeApp/Shared/SurveyPrompt.razor" "{8829d00f-11b8-4213-878b-770e8597ac16}" "5758a2f9eceae731d9941fe2e845fdceb4837f61451b916017978383350a7afc"
// <auto-generated/>
#pragma warning disable 1591
namespace RihalChallengeApp.Shared
{
    #line hidden
    using global::System;
    using global::System.Collections.Generic;
    using global::System.Linq;
    using global::System.Threading.Tasks;
    using global::Microsoft.AspNetCore.Components;
#nullable restore
#line 1 "/mnt/c/Users/ahmed/Projects/rihal-challenges/dotnet/RihalChallengeApp/_Imports.razor"
using System.Net.Http;

#line default
#line hidden
#nullable disable
#nullable restore
#line 2 "/mnt/c/Users/ahmed/Projects/rihal-challenges/dotnet/RihalChallengeApp/_Imports.razor"
using Microsoft.AspNetCore.Authorization;

#line default
#line hidden
#nullable disable
#nullable restore
#line 3 "/mnt/c/Users/ahmed/Projects/rihal-challenges/dotnet/RihalChallengeApp/_Imports.razor"
using Microsoft.AspNetCore.Components.Authorization;

#line default
#line hidden
#nullable disable
#nullable restore
#line 4 "/mnt/c/Users/ahmed/Projects/rihal-challenges/dotnet/RihalChallengeApp/_Imports.razor"
using Microsoft.AspNetCore.Components.Forms;

#line default
#line hidden
#nullable disable
#nullable restore
#line 5 "/mnt/c/Users/ahmed/Projects/rihal-challenges/dotnet/RihalChallengeApp/_Imports.razor"
using Microsoft.AspNetCore.Components.Routing;

#line default
#line hidden
#nullable disable
#nullable restore
#line 6 "/mnt/c/Users/ahmed/Projects/rihal-challenges/dotnet/RihalChallengeApp/_Imports.razor"
using Microsoft.AspNetCore.Components.Web;

#line default
#line hidden
#nullable disable
#nullable restore
#line 7 "/mnt/c/Users/ahmed/Projects/rihal-challenges/dotnet/RihalChallengeApp/_Imports.razor"
using Microsoft.JSInterop;

#line default
#line hidden
#nullable disable
#nullable restore
#line 8 "/mnt/c/Users/ahmed/Projects/rihal-challenges/dotnet/RihalChallengeApp/_Imports.razor"
using RihalChallengeApp;

#line default
#line hidden
#nullable disable
#nullable restore
#line 9 "/mnt/c/Users/ahmed/Projects/rihal-challenges/dotnet/RihalChallengeApp/_Imports.razor"
using RihalChallengeApp.Shared;

#line default
#line hidden
#nullable disable
    public partial class SurveyPrompt : global::Microsoft.AspNetCore.Components.ComponentBase
    {
        #pragma warning disable 1998
        protected override void BuildRenderTree(global::Microsoft.AspNetCore.Components.Rendering.RenderTreeBuilder __builder)
        {
            __builder.OpenElement(0, "div");
            __builder.AddAttribute(1, "class", "alert alert-secondary mt-4");
            __builder.AddAttribute(2, "role", "alert");
            __builder.AddMarkupContent(3, "\r\n    <span class=\"oi oi-pencil mr-2\" aria-hidden=\"true\"></span>\r\n    ");
            __builder.OpenElement(4, "strong");
#nullable restore
#line 3 "/mnt/c/Users/ahmed/Projects/rihal-challenges/dotnet/RihalChallengeApp/Shared/SurveyPrompt.razor"
__builder.AddContent(5, Title);

#line default
#line hidden
#nullable disable
            __builder.CloseElement();
            __builder.AddMarkupContent(6, "\r\n\r\n    ");
            __builder.AddMarkupContent(7, "<span class=\"text-nowrap\">\r\n        Please take our\r\n        <a target=\"_blank\" class=\"font-weight-bold\" href=\"https://go.microsoft.com/fwlink/?linkid=2137813\">brief survey</a>\r\n    </span>\r\n    and tell us what you think.\r\n");
            __builder.CloseElement();
        }
        #pragma warning restore 1998
#nullable restore
#line 12 "/mnt/c/Users/ahmed/Projects/rihal-challenges/dotnet/RihalChallengeApp/Shared/SurveyPrompt.razor"
       
    // Demonstrates how a parent component can supply parameters
    [Parameter]
    public string Title { get; set; }

#line default
#line hidden
#nullable disable
    }
}
#pragma warning restore 1591
