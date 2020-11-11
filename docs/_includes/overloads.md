{% for overload in page.overloads %}
<div class="overload" markdown="1">

{% capture heading %}
Overload {{ forloop.index }}
{% if overload.name %}
: {{ overload.name }}
{% endif %}
{% endcapture %}

### {{ heading | strip_newlines }}

```ts
{{ overload.signature | strip }}
```

<div class="description">{% include linkify.html description=overload.description %}</div>
{% include parameters.html parameters=overload.parameters %}

</div>
{% endfor %}
